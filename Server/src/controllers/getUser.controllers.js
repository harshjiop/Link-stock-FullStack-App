import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";
import { Page } from "../models/Page.model.js";
import { Product } from "../models/Product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
      $lookup: {
        from: "themes",
        localField: "theme",
        foreignField: "_id",
        as: "UserTheme",
      },
    },
    {
      $project: {
        fullName: 1,
        email: 1,
        avatar: 1,
        bio: 1,
        UserLink: 1,
        UserTheme: 1,
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
const getuser_All_Product = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username) {
    throw new ApiError(400, "Username is missing");
  }

  const User_Product = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "Product_owner",
        as: "UserProduct",
      },
    },

    {
      $project: {
        username: 1,
        fullName: 1,
        email: 1,
        avatar: 1,
        bio: 1,
        UserProduct: 1,
      },
    },
  ]);
  if (!User_Product?.length) {
    throw new ApiError(400, "user Note Found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, User_Product, "User Product fetched successfully")
    );
});

const gethomeuser = asyncHandler(async (req, res) => {
  const UserData = await User.find().sort({ _id: -1 }).limit(4);

  const UserName = await UserData.map((data, index) => {
    return User.aggregate([
      {
        $match: {
          username: data.username?.toLowerCase(),
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
        $lookup: {
          from: "themes",
          localField: "theme",
          foreignField: "_id",
          as: "UserTheme",
        },
      },
      {
        $project: {
          fullName: 1,
          username:1,
          email: 1,
          avatar: 1,
          UserLink: 1,
          UserTheme: 1,
        },
      },
    ]);
  });

  const alldata = Promise.all(UserName).then(function (results) {
    return res
      .status(200)
      .json(new ApiResponse(200, results, "Home User fetched successfully"));
  });
});

export { getuser, getuser_All_Product, gethomeuser };
