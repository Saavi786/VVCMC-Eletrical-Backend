const express = require('express');
const router = express.Router();
const {
    addNewData,
    getAllData,
    addWardCommittee, deleteWardCommittee,
    addTypeofBuilding, deleteTypeofBuilding,
    addFloor, deleteFloor,
    addCFL, deleteCFL,
    addLED, deleteLED,
    addAC, deleteAC
} = require('../../controllers/Mapoffice/MapOfficeStaticController');

// Add new data
router.post('/addNewData', addNewData);

// Get all data
router.get('/getAllData', getAllData);

// WardCommittee routes
router.post('/addWardCommittee', addWardCommittee);
router.post('/deleteWardCommittee', deleteWardCommittee);

// TypeofBuilding routes
router.post('/addTypeofBuilding', addTypeofBuilding);
router.post('/deleteTypeofBuilding', deleteTypeofBuilding);

// Floor routes
router.post('/addFloor', addFloor);
router.post('/deleteFloor', deleteFloor);

// CFL routes
router.post('/addCFL', addCFL);
router.post('/deleteCFL', deleteCFL);

// LED routes
router.post('/addLED', addLED);
router.post('/deleteLED', deleteLED);

// AC routes
router.post('/addAC', addAC);
router.post('/deleteAC', deleteAC);

module.exports = router;
