const express = require('express');
const router = express.Router();
const mapOfficeResponseController = require('../../controllers/Mapoffice/MapOfficeResponseController');

// Add a new MapOfficeResponse with separate data fields
router.post('/responses/add', mapOfficeResponseController.addMapOfficeResponse);

// Get all MapOfficeResponses
router.get('/responses/get', mapOfficeResponseController.getAllMapOfficeResponses);

// Get a single MapOfficeResponse by ID
router.get('/responses/get/:id', mapOfficeResponseController.getMapOfficeResponseById);

// Delete a MapOfficeResponse by ID
router.delete('/responses/del/:id', mapOfficeResponseController.deleteMapOfficeResponse);

module.exports = router;
