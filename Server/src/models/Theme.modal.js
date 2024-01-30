import mongoose, { Schema } from "mongoose";

const ThemeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  containerClass: {
    type: String,
  },
  upperSectionClass: {
    type: String,
  },
  linkContainerClass: {
    type: String,
  },
});

export const Theme = mongoose.model("Theme", ThemeSchema);

// "name": "default",
// "containerClass": "bg-blue-100",
// "upperSectionClass": "bg-[#fff]",
// "linkContainerClass": "bg-white",
// "keyWord": "dark "

// "name": 'Sapphire Gradient',
// "containerClass": 'bg-gradient-to-r from-[#243949] to-[#517fa4]',
// "upperSectionClass": 'text-white',
// "linkContainerClass": 'bg-zinc-200/40 text-white',
// "keyWords": 'simple',
