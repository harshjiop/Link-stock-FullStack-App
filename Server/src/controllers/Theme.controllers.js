import { Theme } from "../models/Theme.modal.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const NewThemeCreated = asyncHandler(async (req, res) => {
  const { name, mainStyles, previewStyles } = req.body;
  console.log(name, mainStyles, previewStyles);

  if (!name || !mainStyles || !previewStyles) {
    throw new ApiError(400, "All Style are required");
  }

  const NewThemeCreated = await Theme.create({
    name,
    mainStyles,
    previewStyles,
  });

  if (!NewThemeCreated) {
    throw new ApiError(500, "Something went wrong while Add new thme ");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, NewThemeCreated, "New Theme Add Successfully"));
});

const GetAllTheme = asyncHandler(async (req, res) => {
  const AllTheme = await Theme.find();

  if (!AllTheme) {
    throw new ApiError(500, "Something went wrong while Geting All theme ");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, AllTheme, "Getting All theme Successfully"));
});
const DeleteTheme = asyncHandler(async (req, res) => {
  const { themeId } = req.body;
  if (!themeId) {
    throw new ApiError(400, "Theme Id Note avalable");
  }
  const DeleteTheme = await Theme.findByIdAndDelete(themeId);
  if (!DeleteTheme) {
    throw new ApiError(400, "Something Went Wrong Delete Theme");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, DeleteTheme, "Theme Delete Successfully"));
});

export { NewThemeCreated, GetAllTheme, DeleteTheme };
