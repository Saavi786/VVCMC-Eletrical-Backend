const multer = require('multer');


// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname); // Appending extension
    }
});

// Multer upload configuration for multiple files
const upload = multer({ storage: storage });

module.exports = upload;
