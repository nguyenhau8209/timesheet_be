import multer from "multer";
//Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/"); //Upload will be stored in the 'upload/' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); //Use a unique filename
  },
});

const upload = multer({ storage: storage });
const multerUtil = {
  upload,
};
export default multerUtil;
