import { Theme } from "../models/Theme.modal.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const NewThemeCreated = asyncHandler(async (req, res) => {
  const {
    name,
    containerClass,
    upperSectionClass,
    linkContainerClass,
    keyWord,
  } = req.body;

  if (
    !name ||
    !containerClass ||
    !upperSectionClass ||
    !linkContainerClass ||
    !keyWord
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const NewThemeCreated = await Theme.create({
    name,
    containerClass,
    upperSectionClass,
    linkContainerClass,
    keyWord,
  });

  if (!NewThemeCreated) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, NewThemeCreated, "New Theme Add Successfully"));
});

export { NewThemeCreated };
