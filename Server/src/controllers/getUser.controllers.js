import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";
import { Page } from "../models/Page.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// const registerUser = asyncHandler(async (req, res) => {
//   // get user details from frontend
//   // validation - not empty
//   // check if user already exists: username, email
//   // check for images, check for avatar
//   // upload them to cloudinary, avatar
//   // create user object - create entry in db
//   // remove password and refresh token field from response
//   // check for user creation
//   // return res

//   const { fullName, email, username, password } = req.body;
//   const avatar = "www.xyz.com";
//   //   console.log("email: ", email);

//   if (!fullName || !email || !username || !password) {
//     throw new ApiError(400, "All fields are required");
//   }

//   const existedUser = await User.findOne({
//     $or: [{ username }, { email }],
//   });

//   if (existedUser) {
//     throw new ApiError(409, "User with email or username already exists");
//   }

//   const user = await User.create({
//     fullName,
//     avatar,
//     email,
//     password,
//     username: username.toLowerCase(),
//   });

//   const createdUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   );

//   if (!createdUser) {
//     throw new ApiError(500, "Something went wrong while registering the user");
//   }

//   return res
//     .status(201)
//     .json(new ApiResponse(200, createdUser, "User registered Successfully"));
// });

const getuser = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username) {
    throw new ApiError(400, "Username is missing");
  }

  const UserProfile = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "pages",
        localField: "_id",
        foreignField: "owner",
        as: "UserLink",
      },
    },
    {
      $project: {
        fullName: 1,
        email: 1,
        avatar: 1,
        bio:1,
        UserLink: 1,
      },
    },
  ]);
  if (!UserProfile?.length) {
    throw new ApiError(400, "user Note Found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, UserProfile, "User Profile fetched successfully")
    );
});

export { getuser };
