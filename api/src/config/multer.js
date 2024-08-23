import multer from "multer";
import path from "path";
import fs from "fs";

// Set up multer for file uploads
const upload = multer({
    // Define the storage settings
    storage: multer.diskStorage({
          // Set the destination for uploaded files
        destination: function (req, file, cb) {
            const newDirectory = path.join(
                process.cwd(),
                "public/images"
            );
             // Create the directory if it doesn't exist
            fs.mkdirSync(newDirectory, { recursive: true });
            cb(null, newDirectory);
        },
              // Set the filename for uploaded files
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    }),
      // Define limits for the uploaded files
    limits: {
        fileSize: 1024 * 1024 * 5,//5 MB
    },
      // Define file filter to accept webp and jpg files
    fileFilter: function (req, file, cb) {
        const filetypes = /webp|jpg|jpeg/;
        const isExtensionValid = filetypes.test(path.extname(file.originalname).toLowerCase());
        const isMimetypeValid = filetypes.test(file.mimetype);
        if (isExtensionValid && isMimetypeValid) {
            cb(null, true);
        } else {
            cb("Image au format webp ou jpg uniquement", false);
        }
    },
}).single("picture");

export default upload;