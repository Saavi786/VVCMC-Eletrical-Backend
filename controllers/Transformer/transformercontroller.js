const TransformerData = require('../../Model/transformer');
const Counter = require('../Transformer/counterschema'); // Import the Counter model
const moment = require('moment-timezone');

const generateUniqueApplicationID = async () => {
    const prefix = "VVCMC_";
    
    // Find and increment the sequence number
    const counter = await Counter.findByIdAndUpdate(
        { _id: 'applicationID' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    // Generate the application ID with the prefix and sequence number
    const applicationID = `${prefix}${counter.seq}`;

    return applicationID;
};

// Add new data
exports.addData = async (req, res) => {
    try {
        const {
            WardCommittee,
            TransformerCapacity,
            DTCNumber,
            Image,
            ImageLat,
            ImageLong,
            Address
        } = req.body;

        // Check if the DTCNumber already exists
        const existingData = await TransformerData.findOne({ DTCNumber });
        if (existingData) {
            return res.status(400).json({ message: "DTC Number already exists" });
        }

        // Generate unique ApplicationID
        const applicationID = await generateUniqueApplicationID();

        // Create a new instance of the TransformerData model
        const newData = new TransformerData({
            ApplicatioId: applicationID,
            WardCommittee,
            TransformerCapacity,
            DTCNumber,
            Image,
            ImageLat,
            ImageLong,
            Address,
            Date: moment().tz("Asia/Kolkata").format("YYYY-MM-DD"),
            Time: moment().tz("Asia/Kolkata").format("HH:mm:ss"),
        });

        // Save the new data to the database
        const savedData = await newData.save();

        // Send a success response
        res.status(201).json({ message: "Data saved successfully", data: savedData });
    } catch (error) {
        console.error("Error adding data:", error);
        res.status(500).json({ message: "Encountered an unexpected condition." });
    }
};

// Get all data
exports.getData = async (req, res) => {
    try {
        const data = await TransformerData.find();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete data by DTCNumber
exports.deleteData = async (req, res) => {
    try {
        const { DTCNumber } = req.params;
        const deletedData = await TransformerData.findOneAndDelete({ DTCNumber });
        if (!deletedData) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Data deleted successfully", data: deletedData });
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Ward/Transformer Count 
exports.wardCount = async (req, res) => {
    try {
        const result = await TransformerData.aggregate([
            { $group: { _id: "$WardCommittee", count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
        ]);

        // Prepare response data
        const countsByWardCommittee = result.map((item) => ({
            wardCommittee: item._id,
            count: item.count,
        }));

        res.status(200).json(countsByWardCommittee);
    } catch (error) {
        console.error("Error counting distinct elements:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller function to get data for today
exports.getDataForToday = async (req, res) => {
    const todayDate = new Date().toISOString().split('T')[0];

    try {
        const data = await TransformerData.find({ Date: todayDate });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data: " + error.message });
    }
};
