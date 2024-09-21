const Image = require('../Model/imageModel');
const path = require('path');
const fs = require('fs');

// Upload an image
const uploadImage = async (req, res) => {
    try {
        const newImage = new Image();
        newImage.name = req.file.originalname;
        newImage.data = fs.readFileSync(path.join(__dirname, '../uploads/') + req.file.filename);
        newImage.contentType = req.file.mimetype;

        await newImage.save();
        res.status(201).send('Image uploaded successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get all images
const getAllImages = async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    uploadImage,
    getAllImages
};
