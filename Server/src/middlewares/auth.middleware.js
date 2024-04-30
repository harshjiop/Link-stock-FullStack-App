import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized Request");
  }

  // verify access token and regenerating access token if expires(can be done in more modular and clean format)
  const decodedToken = await jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (error, decodes) => {
      // check wether token expired or not
      if (error?.name === "TokenExpiredError") {
        // getting details by decoding access token(by ignoring expiration)
        const expiredToken = jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET,
          { ignoreExpiration: true }
        );
        // if decoded token not found throw error
        if (!expiredToken) throw new ApiError("Wrong Token");

        // find the user by the decoded token data
        const user = await User.findById(expiredToken._id);
        // throw error if user not found
        if (!user) throw new ApiError("User Not Found");

        // verify refresh token
        const verifyRefreshToken = jwt.verify(
          user.refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        // throw error if token is not verified
        // todo: regenerate refresh token if expired
        if (!verifyRefreshToken) throw new ApiError("Invalid Refresh Token");

        // create new access token (see user model for reference)
        const newAccessToken = await user.generateAccessToken();

        // re-verify the new token to main the output structure of the return value(can be done other ways)
        const newDecodedToken = jwt.verify(
          newAccessToken,
          process.env.ACCESS_TOKEN_SECRET
        );
        return newDecodedToken;
      }

      // check whether decoded token is undefined or not(ps: 'decodes' is undefined if it throw error)
      if (decodes) {
        return decodes;
      }
      // handling other errors
      else {
        return error;
      }
    }
  );
  const user = await User.findById(decodedToken?._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "Invalid Access Token");
  }
  // if (user.account_email_Verified === false) {
  //   throw new ApiError(401, "User Note verified");
  // }
  req.user = user;
  next();
});

export { verifyJWT };
