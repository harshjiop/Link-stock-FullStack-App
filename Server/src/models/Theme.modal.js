import mongoose, { Schema } from "mongoose";

const ThemeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  mainStyles: {
    type: Object,
  },
  previewStyles: {
    type: Object,
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

// {

//   "name": 'Blush Horizon',
//   "containerClass": 'bg-[url(https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] bg-no-repeat bg-center bg-cover',
//   "upperSectionClass": 'text-white bg-slate-900/20 backdrop-blur-sm',
//   "linkContainerClass": 'bg-zinc-100/30 backdrop-blur-sm text-white',
// }

// {
//   "name": 'Roseate Affection',
//   "containerClass": 'bg-[url(https://images.pexels.com/photos/4226765/pexels-photo-4226765.jpeg?auto=compress&cs=tinysrgb&w=600)] bg-no-repeat bg-center bg-cover',
//   "upperSectionClass": 'text-white backdrop-blur-sm',
//   "linkContainerClass": 'bg-pink-200/30 backdrop-blur-sm text-white',
// }

// {
//   "name": 'Adiyogi',
//   "containerClass": 'bg-[url(https://images.pexels.com/photos/17812112/pexels-photo-17812112/free-photo-of-adiyogi-shiva-statue.jpeg?auto=compress&cs=tinysrgb&w=600)] bg-no-repeat bg-center bg-cover',
//   "upperSectionClass": 'text-white backdrop-blur-sm bg-slate-900/50',
//   "linkContainerClass": 'bg-slate-900/50 backdrop-blur-sm text-white',
// }
