import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  const imageFileTypes = /jpeg|jpg|png|gif|webp/;
  const videoFileTypes = /mp4|avi|mov|mkv|wmv|flv|webm|mpeg|mpg|3gp/;

  const isImage = imageFileTypes.test(file.mimetype) || imageFileTypes.test(path.extname(file.originalname));
  const isVideo = videoFileTypes.test(file.mimetype) || videoFileTypes.test(path.extname(file.originalname));

  if (isImage || isVideo) {
    return callback(null, true);
  }

  callback('Give proper file format to upload');
}

export const upload = multer({
  storage,
  limits: { fileSize: '1000000' },
  fileFilter: fileFilter
});
