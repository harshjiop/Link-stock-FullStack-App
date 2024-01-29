import mongoose, { Schema } from "mongoose";

const ThemeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    containerClass: {
      type: String,
      required: true,
    },
    upperSectionClass: {
      type: String,
      required: true,
    },
    linkContainerClass: {
      type: String,
      required: true,
    },
    keyWord: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Theme = mongoose.model("Theme", ThemeSchema);

// id: 23423,
//     name: 'default',
//     containerClass: 'bg-blue-100',
//     upperSectionClass: 'bg-[#fff]',
//     linkContainerClass: 'bg-white',
//     keyWord: 'dark '

// name: 'default',
//     containerClass: 'bg-blue-100',
//     upperSectionClass: 'bg-[#fff]',
//     linkContainerClass: 'bg-white',
//     keyWord: 'dark '
