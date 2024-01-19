import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Page } from "../models/Page.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";

const PageProfileUpdate = asyncHandler(async (req, res) => {});
const Addlink = asyncHandler(async (req, res) => {});
const Deletelink = asyncHandler(async (req, res) => {});
const Updatelink = asyncHandler(async (req, res) => {});

export { Addlink, Deletelink, Updatelink, PageProfileUpdate };
