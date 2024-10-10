const express = require('express');
const router = express.Router();
const resNewDataController = require('../controllers/newController');

// Add new data
router.post("/add-data", resNewDataController.addData);

// Get all data
router.get("/get-new-data", resNewDataController.getData);

// Delete data by ConsumerID
router.delete("/delete-data/:ConsumerID", resNewDataController.deleteData);

// Add new response to the Response array
router.post("/add-response/:ConsumerID", resNewDataController.addResponse);

// Delete a response from the Response array
router.delete("/delete-response/:ConsumerID/:responseId", resNewDataController.deleteResponse);

// Get Ward/Meter Count
router.get("/new-ward-count", resNewDataController.wardCount);

// Get the Pole-count-wardWise of responses
router.get("/ward-wise-response-count", resNewDataController.getWardWiseResponseCount);

// Route to get data for today
router.get('/data/today', resNewDataController.getDataForToday);

// Route to get data for month and year wise
router.get('/data/year-month', resNewDataController.getDataForMonthAndYear);

// Update route to use ConsumerID
router.put('/update-consumer/:consumerId', resNewDataController.updateResNewData);

module.exports = router;