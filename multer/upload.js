const path = require("path")

const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, path.join(__dirname, "../public/uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));

    if(mimetype && extname){
        return cb(null, true);
    }

    cb("Error: Tipo de archivo no soportado");
}

const limits = {
    fileSize: 1024 * 1024 * 1
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
})

module.exports = upload