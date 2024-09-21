// resRoutes.js
const express = require('express');
const router = express.Router();
const resController = require('./../controllers/resController'); // Adjust the path as needed

// Route to get data for today
// router.get('/data/today', resController.getDataForToday);

// Route to get count of each distinct WardCommittee for today
router.get('/data/today/ward-committee-counts', resController.getWardCommitteeCountsForToday);

// Route to get data for a specific month and year
router.get('/data/month-year', resController.getDataForMonthAndYear);

// Route to get count of each distinct WardCommittee for a specific month and year
router.get('/data/month-year/ward-committee-counts', resController.getWardCommitteeCountsForMonthAndYear);

// Route to get count of PoleName for a specific date
router.get('/data/pole-name-counts', resController.getPoleNameCountsForDate);

// Route to get count of LightName for a specific date
router.get('/data/light-name-counts', resController.getLightNameCountsForDate);

// Route to get count of PoleName for a specific month and year
router.get('/data/pole-name-month-year-counts', resController.getPoleNameCountsForMonthYear);

// Route to get count of LightName for a specific month and year
router.get('/data/light-name-month-year-counts', resController.getLightNameCountsForMonthYear);


module.exports = router;
