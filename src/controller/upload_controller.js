

import multer from "multer";

 const saveFile = multer.diskStorage({
    destination: (req, file ,next) => {
         next(null,"uploads/");
    },
    filename: (req, file ,next) => {
        next(null, Date.now() + '_' + file.originalname);
   }
});

export const upLoadFile = multer({storage: saveFile});