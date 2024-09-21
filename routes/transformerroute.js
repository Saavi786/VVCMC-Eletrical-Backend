const express = require('express');
const router = express.Router();
const transformerDataController = require('../controllers/Transformer/transformercontroller');

// Add new transformer data
router.post("/add-transformer", transformerDataController.addData);

// Get all transformer data
router.get("/get-transformers", transformerDataController.getData);

// Delete transformer data by DTCNumber
router.delete("/delete-transformer/:DTCNumber", transformerDataController.deleteData);

// Get Ward/Transformer Count
router.get("/transformer-ward-count", transformerDataController.wardCount);

// Get transformer data for today
router.get('/transformer/today', transformerDataController.getDataForToday);

module.exports = router;
