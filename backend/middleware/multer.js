import multer from 'multer'

const storage = multer.memoryStorage();

//singleupload
export const singleUpload=multer({storage}).single("file")

//multipleimageupload
export const multipleUpload=multer({storage}).array("files",5);
