const express = require("express");
const { deleteWard, deleteConsumerID, deletePurpose, deleteType, deletePoleByName, deletePoleHeight, deleteLightByName, deleteBracket, deleteTypeBracket, deleteWatts, addWard } = require("./../controllers/staticDataController");

const router = express.Router();

router.put('/delete-Ward/:ward', deleteWard);
router.put('/delete-consumerID/:consumerNumber', deleteConsumerID);
router.put('/delete-purpose/:purpose', deletePurpose);
router.put('/delete-type/:type', deleteType);
router.delete('/delete-pole/:poleName', deletePoleByName);
router.delete('/delete-Light/:lightName', deleteLightByName);
router.delete('/delete-height/:poleName/:height', deletePoleHeight);
router.delete('/delete-tbracket/:poleName/:typeBracket', deleteTypeBracket);
router.delete('/delete-bracket/:poleName/:bracket', deleteBracket);
router.delete('/delete-watt/:lightName/:watts', deleteWatts);
router.put('/add-consumer-ward', addWard);

module.exports = router;