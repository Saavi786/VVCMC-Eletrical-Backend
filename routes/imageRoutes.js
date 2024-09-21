const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageController = require('../controllers/imageController');

// Multer middleware setup for handling multipart/form-data
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// POST endpoint to upload an image
router.post('/upload', upload.single('image'), imageController.uploadImage);

// GET endpoint to fetch all images
router.get('/images', imageController.getAllImages);

module.exports = router;
