// const MapOfficeAssets = require('../../Model/MapOfficeAssets/Mapofficeassets');
// const Counter = require('../../Model/MapOfficeAssets/mapofficeuniqueschema'); // Import the Counter model
// const moment = require('moment-timezone');

// const generateUniqueApplicationID = async () => {
//     const prefix = "VVCMC_Mapoffice";
    
//     // Find and increment the sequence number
//     const counter = await Counter.findByIdAndUpdate(
//         {
//             _id: 'applicationID'
//         },
//         {
//             $inc: { seq: 1 }
//         },
//         { 
//             new: true,
//             upsert: true
//         }
//     );

//     // Generate the application ID with the prefix and sequence number
//     const applicationID = `${prefix}${counter.seq}`;

//     return applicationID;
// };

// // Add new data
// exports.addData = async (req, res) => {
//     try {
//         const {
//             WardCommitte,
//             TypseofBuilding,
//             BuildingMeterImage,
//             BuildingMeterImageLat,
//             BuildingMeterImageLong,
//             SancationLoad,
//             ActualLoad
//         } = req.body;

//         // Check if the ApplicationId already exists
//         const existingData = await MapOfficeAssets.findOne({ ApplicatioId });
//         if (existingData) {
//             return res.status(400).json({ message: "ApplicationId already exists" });
//         }

//         // Generate unique ApplicationID
//         const applicationID = await generateUniqueApplicationID();

//         // Create a new instance of the MapOfficeAssets model
//         const newData = new MapOfficeAssets({

//             ApplicatioId: applicationID,
//             WardCommitte,
//             TypseofBuilding,
//             BuildingMeterImage,
//             BuildingMeterImageLat,
//             BuildingMeterImageLong,
//             SancationLoad,
//             ActualLoad,
//             Date: moment().tz("Asia/Kolkata").format("YYYY-MM-DD"),
//             Time: moment().tz("Asia/Kolkata").format("HH:mm:ss"),
            
//         });

//         // Save the new data to the database
//         const savedData = await newData.save();

//         // Send a success response
//         res.status(201).json({ message: "Data Added successfully", data: savedData });
//     } catch (error) {
//         console.error("Error adding data:", error);
//         res.status(500).json({ message: "Encountered an unexpected condition." });
//     }
// };

// // Get all data
// exports.getData = async (req, res) => {
//     try {
//         const data = await MapOfficeAssets.find();
//         res.status(200).json(data);
//     } catch (error) {
//         console.error("Error retrieving data:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Delete data by ApplicationId
// exports.deleteData = async (req, res) => {
//     try {
//         const { ApplicatioId } = req.params;
//         const deletedData = await MapOfficeAssets.findOneAndDelete({ ApplicatioId });
//         if (!deletedData) {
//             return res.status(404).json({ message: "Data not found" });
//         }
//         res.status(200).json({ message: "Data deleted successfully", data: deletedData });
//     } catch (error) {
//         console.error("Error deleting data:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// // WardCommitte count
// exports.wardCount = async (req, res) => {
//     try {
//         const result = await MapOfficeAssets.aggregate([
//             { $group: { _id: "$WardCommitte", count: { $sum: 1 } } },
//             { $sort: { _id: 1 } },
//         ]);

//         // Prepare response data
//         const countsByWardCommitte = result.map((item) => ({
//             WardCommitte: item._id,
//             count: item.count,
//         }));

//         res.status(200).json(countsByWardCommitte);
//     } catch (error) {
//         console.error("Error counting WardCommitte:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// // Get data recorded for today
// exports.getDataForToday = async (req, res) => {
//     const todayDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

//     try {
//         const data = await MapOfficeAssets.find({ Date: todayDate });
//         res.status(200).json(data);
//     } catch (error) {
//         console.error("Error fetching data for today:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };
