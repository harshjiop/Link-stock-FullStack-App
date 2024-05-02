import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/Product.model.js";
import mongoose from "mongoose";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const GetAllProduct = asyncHandler(async (req, res) => {
  const Product_owner = req.user._id;
  // const Get_All_Product = await Product.find({ Product_owner });
  const Get_All_Product = await Product.aggregate([
    {
      $match: {
        Product_owner: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $group: {
        _id: null,
        products: { $push: "$$ROOT" },
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "products.Product_owner",
        as: "user",
      },
    },
    {
      $project: {
        _id: 0,
        user: {
          $arrayElemAt: ["$user", 0],
        },
        products: 1,
      },
    },
    {
      $project: {
        "user.password": 0,
      },
    },
  ]);
  return res
    .status(200)
    .json(
      new ApiResponse(200, Get_All_Product[0], "All Link Geting sucessful")
    );
});
const AddProduct = asyncHandler(async (req, res) => {
  const {
    Product_Name,
    Product_Desc,
    Product_Price,
    Product_Discount_Price,
    Product_status,
    Product_Retailer,
    Product_Url,
  } = req.body;
  const Product_img_files = req.files;

  if (
    !Product_Name ||
    !Product_Desc ||
    !Product_Price ||
    !Product_Discount_Price ||
    !Product_Url
  ) {
    throw new ApiError(400, "All fields are required");
  }
  if (!Product_img_files) {
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
    Product_Url,
    Product_Discount_Price,
    Product_status: Product_status ?? true,
    Product_Retailer: Product_Retailer ?? "",
  });

  if (!ProductUplodeMongoDb) {
    const DeleteCloudnaryImg = Product_Photo.map(
      async function (Product_Photo, index) {
        const Delete_img = await deleteFromCloudinary(
          Product_Photo.Product_img_Cloudnary_Public_id
        );
      }
    );
    throw new ApiError(500, "Something went wrong while add Product");
  }

  if (ProductUplodeMongoDb) {
    return res
      .status(201)
      .json(
        new ApiResponse(200, ProductUplodeMongoDb, "Add Product Successfully")
      );
  }
});
const UpdateProduct = asyncHandler(async (req, res) => {
  const { productid } = req.params;

  const {
    Product_Name,
    Product_Desc,
    Product_Price,
    Product_Discount_Price,
    Product_Url,
    Image_Delete_List,
  } = req.body;

  const Product_img_files = req.files;

  if (
    !Product_Name ||
    !Product_Desc ||
    !Product_Price ||
    !Product_Discount_Price ||
    !Product_Url
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const UpdateProdectData = await Product.findById(productid);
  const OldProductImage = UpdateProdectData.Product_Img;
  const Arrey_Delete_Image_PublicId = [];
  const New_Old_Product_Image = [];

  if (Image_Delete_List) {
    const DeletedImage = JSON.parse(Image_Delete_List);
    DeletedImage.map((data) => {
      deleteFromCloudinary(data?.id);
      Arrey_Delete_Image_PublicId.push(data?.id);
    });
  }

  OldProductImage.forEach((image) => {
    if (
      !Arrey_Delete_Image_PublicId.includes(
        image.Product_img_Cloudnary_Public_id
      )
    ) {
      New_Old_Product_Image.push(image);
    }
  });

  if (Product_img_files) {
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

    const newimage = [...New_Old_Product_Image, ...Product_Photo];

    const ProductDeteles = await Product.findByIdAndUpdate(productid, {
      Product_Name,
      Product_Desc,
      Product_Price,
      Product_Discount_Price,
      Product_Url,
      Product_Img: newimage,
    });

    return res
      .status(201)
      .json(new ApiResponse(200, "Your Product Update Sucessful"));
  } else {
    const ProductDeteles = await Product.findByIdAndUpdate(productid, {
      Product_Name,
      Product_Desc,
      Product_Price,
      Product_Discount_Price,
      Product_Url,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(200, ProductDeteles, "Your Product Update Sucessful")
      );
  }
});
const DeleteProduct = asyncHandler(async (req, res) => {
  console.log("run delete product ");
  const { productid } = req.params;
  const Product_owner = req.user._id;
  const ProductDeteles = await Product.findByIdAndDelete(productid);

  if (!ProductDeteles) {
    throw new ApiError("product not found");
  }

  if (ProductDeteles?.Product_Img) {
    ProductDeteles.Product_Img.map(async (img) => {
      await deleteFromCloudinary(img?.Product_img_Cloudnary_Public_id);
    });
  }

  const Get_All_Product = await Product.find({ Product_owner });
  if (!Get_All_Product) {
    throw new ApiError("failed to get latest product");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, Get_All_Product, "All Product Geting Sucessful")
    );
});

const GetProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(404, "ID not found");
  }

  const response = await Product.findById(id);

  if (!response) {
    throw new ApiError(400, "Product Not Found");
  }

  return res.status(200).json(new ApiResponse(200, response, "Product Found"));
});

export {
  AddProduct,
  DeleteProduct,
  GetAllProduct,
  UpdateProduct,
  GetProductById,
};
