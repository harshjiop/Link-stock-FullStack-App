import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/Product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const GetAllProduct = asyncHandler(async (req, res) => {
  const owner = req.user._id;
  const AllLink = await Page.find({ owner });
  return res
    .status(200)
    .json(new ApiResponse(200, AllLink, "All Link Geting sucessful"));
});
const AddProduct = asyncHandler(async (req, res) => {
  const { Product_Name, Product_Desc, Product_Price, Product_Discount_Price } =
    req.body;
  const Product_img_files = req.files?.Product_img;

  if (
    !Product_Name ||
    !Product_Desc ||
    !Product_Price ||
    !Product_Discount_Price
  ) {
    throw new ApiError(400, "All fields are required");
  }
  if (!Product_img) {
    throw new ApiError(400, "Product img Requair");
  }

  const Product_img_files_Cloudnary_url = [];

  for (const Product_img of Product_img_files) {
    const { path } = Product_img;
    const Cloudinary_New_Path = await uploadOnCloudinary(path);
    Product_img_files_Cloudnary_url.push(Cloudinary_New_Path);
  }

  const Product_Photo = Product_img_files_Cloudnary_url.map(
    function (Product_img_files_Cloudnary_url, index) {
      const Product_img_Cloudnary_Path = Product_img_files_Cloudnary_url?.url;
      const Product_img_Cloudnary_Public_id =
        Product_img_files_Cloudnary_url?.public_id;
      return { Product_img_Cloudnary_Public_id, Product_img_Cloudnary_Path };
    }
  );

  const ProductUplodeMongoDb = await Product.create({
    Product_owner: req.user?._id,
    Product_Name,
    Product_Desc,
    Product_Img: Product_Photo,
    Product_Price,
    Product_Discount_Price,
  });

  if (ProductUplodeMongoDb) {
    return res
      .status(201)
      .json(
        new ApiResponse(200, ProductUplodeMongoDb, "Add Product Successfully")
      );
  }
  if (!ProductUplodeMongoDb) {
    throw new ApiError(500, "Something went wrong while add Product");
  }
});
const UpdateProduct = asyncHandler(async (req, res) => {});
const DeleteProduct = asyncHandler(async (req, res) => {});

export { AddProduct, DeleteProduct, GetAllProduct, UpdateProduct };
