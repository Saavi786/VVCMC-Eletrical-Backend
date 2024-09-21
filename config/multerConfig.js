const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // To avoid naming conflicts
    }
});

const upload = multer({ storage });
module.exports = upload;