import mongoose, { Schema } from "mongoose";

const PageSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String, // cloudinary url
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const Page = mongoose.model("Page", PageSchema);
