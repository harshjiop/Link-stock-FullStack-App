import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "ddib2csvf",
  api_key: 994755516574545,
  api_secret: "tdxceVOoaBiOAPoJpwb9cigtdDk",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    // console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  try {
    if (!publicId) return null;

    // delete from cloudinary
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    return response;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
