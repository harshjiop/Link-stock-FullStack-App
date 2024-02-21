import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    Product_owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    Product_Name: {
      type: String,
      required: true,
    },
    Product_Desc: {
      type: String,
      required: true,
    },
    Product_Img: {
      // type: Array,
      // Product_public_id: {
      //   type: String, // cloudinary
      // },
      // Product_url: {
      //   type: String, // cloudinary
      // },
    },

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
    Product_status: {
      type: Boolean,
      default: true
    },
    Product_Retailer: {
      type: String,

    }
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", ProductSchema);
