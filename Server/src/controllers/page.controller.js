import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Page } from "../models/Page.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";

const GetAllLink = asyncHandler(async (req, res) => {
  const owner = req.user._id;
  const AllLink = await Page.find({ owner });
  return res
    .status(200)
    .json(new ApiResponse(200, AllLink, "All Link Geting sucessful"));
});
const Addlink = asyncHandler(async (req, res) => {
  const { title, url, isActive } = req.body;
  if (!title || !url || !isActive) {
    throw new ApiError(400, "All fields are required");
  }

  if (url.startsWith('/') && title.toLowerCase() !== 'store') {
    throw new ApiError(400, `Url Can't Start With '/'`)
  }

  const thumbnailLocalPath = req.file?.path;
  const ThumbnailCloudinary = await uploadOnCloudinary(thumbnailLocalPath);
  // console.log("thubnail",ThumbnailCloudinary);
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
    thumbnail: {
      public_id: ThumbnailCloudinary?.public_id,
      url: ThumbnailCloudinary?.url,
    } || {
      public_id: "",
      url: "",
    },
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
const Deletelink = asyncHandler(async (req, res) => {
  const { linkId } = req.body;

  const deletedlink = await Page.findById(linkId);

  if (!deletedlink) {
    throw new ApiError(400, "Link not found");
  }

  const thumbnailPublicId = deletedlink.thumbnail.public_id;
  if (thumbnailPublicId) {
    const removeLinkFromCloudinary = await deleteFromCloudinary(
      videoFilePublicId,
      "video"
    );
    if (!removeLinkFromCloudinary) {
      throw new ApiError(400, "Error while deleting file from cloudinary");
    }
  }

  const DeleteLink = await deletedlink.deleteOne();

  if (!DeleteLink) {
    throw new ApiError(400, "Error while deleting video");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, DeleteLink, "video deleted successfully"));
});

const Updatelink = asyncHandler(async (req, res) => {
  const { title, url, isActive, linkId } = req.body;
  if (!title || !url || !linkId) {
    throw new ApiError(400, "All Fild is required");
  }

  console.log(title, url, isActive, linkId);

  const Update = await Page.findByIdAndUpdate(
    linkId,
    {
      $set: {
        title,
        url,
        isActive: isActive || true,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, Update, "Link updated successfully"));
});

const UpdateThumbnail = asyncHandler(async (req, res) => {
  const { linkId } = req.body;
  const ThumbnailLocalPath = req.file?.path;

  if (!ThumbnailLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }
  const ThumbnailCloudinary = await uploadOnCloudinary(ThumbnailLocalPath);

  if (!ThumbnailCloudinary) {
    throw new ApiError(400, "Error while uploading on avatar");
  }

  const UserLink = await Page.findByIdAndUpdate(
    linkId,
    {
      $set: {
        thumbnail: {
          public_id: ThumbnailCloudinary.public_id,
          url: ThumbnailCloudinary.url,
        },
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, UserLink, "Thumbnail image updated successfully")
    );
});
const removeThumbnail = asyncHandler(async (req, res) => {
  const { linkId } = req.body;
  const Link = await Page.findById(linkId);
  const deleteCloudanariy = await deleteFromCloudinary(
    Link?.thumbnail?.public_id
  );

  const updateLink = await Page.findByIdAndUpdate(
    linkId,
    {
      $set: {
        thumbnail: {
          url: "https://res.cloudinary.com/ddib2csvf/image/upload/v1706447714/Avtar.png",
        },
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updateLink, "Avatar image updated successfully")
    );
});

const isAcctiveLink = asyncHandler(async (req, res) => {
  const { isActive, linkId } = req.body;
  if (!isActive || !linkId) {
    throw new ApiError(400, "All Fild is required");
  }

  const Update = await Page.findByIdAndUpdate(
    linkId,
    {
      $set: {
        isActive: isActive || true,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, Update, "Link updated successfully"));
});

export {
  Addlink,
  Deletelink,
  Updatelink,
  GetAllLink,
  UpdateThumbnail,
  isAcctiveLink,
  removeThumbnail,
};
