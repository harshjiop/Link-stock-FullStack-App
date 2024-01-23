import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Page } from "../models/Page.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";

const PageProfileUpdate = asyncHandler(async (req, res) => {});
const Addlink = asyncHandler(async (req, res) => {
  const { title, url, isActive } = req.body;
  if (!title || !url || !isActive) {
    throw new ApiError(400, "All fields are required");
  }
  const thumbnailLocalPath = req.file?.path;
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  if (thumbnailLocalPath) {
    console.log("note run");
    const thumbnailLocalPathDelete = await fs.unlink(
      thumbnailLocalPath,
      function (err) {
        if (err) {
          console.log("error in deleting local thumbanil", err);
        }
        console.log("File deleted successfully!");
      }
    );
  }

  const linkCreated = await Page.create({
    title,
    url,
    thumbnail: thumbnail?.url || "",
    isActive,
    owner: req.user._id,
  });

  if (linkCreated) {
    return res
      .status(201)
      .json(new ApiResponse(200, linkCreated, "User Add link Successfully"));
  }
  if (!linkCreated) {
    throw new ApiError(500, "Something went wrong while add link");
  }
});
const Deletelink = asyncHandler(async (req, res) => {});
const Updatelink = asyncHandler(async (req, res) => {});

export { Addlink, Deletelink, Updatelink, PageProfileUpdate };
