import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    Product_Name: {
      type: String,
      required: true,
    },
    Product_Desc: {
      type: String,
      required: true,
    },
    Product_Img: [
      {
        Product_public_id: {
          type: String, // cloudinary
        },
        Product_url: {
          type: String, // cloudinary
        },
      },
    ],
    Product_Price: {
      type: Number,
      require: true,
    },
    Product_Discount_Price: {
      type: Number,
      require: true,
    },
    Product_category_id: {
      type: Schema.Types.ObjectId,
      ref: "Product_category",
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", ProductSchema);
