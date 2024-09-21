const ResNewData = require('../Model/newschema');
const moment = require('moment-timezone');
const { v4: uuidv4 } = require('uuid');

const generateUniqueApplicationID = async () => {
    let isUnique = false;
    let applicationID;

    while (!isUnique) {
        applicationID = uuidv4();
        const existingRecord = await ResNewData.findOne({ ApplicationID: applicationID });
        if (!existingRecord) {
            isUnique = true;
        }
    }
    return applicationID;
};

// Add new data
exports.addData = async (req, res) => {
    try {
        const {
            WardCommittee,
            ConsumerID,
            NewMeterNumber,
            Purpose,
            Type,
            Address,
            MeterImageData,
            MeterLatitude,
            MeterLongitude,
            SanctionLoad,
            TimerPanel,
            TimerPanelImage,
        } = req.body;

        // Check if the ConsumerID already exists
        const existingData = await ResNewData.findOne({ ConsumerID });
        if (existingData) {
            return res.status(400).json({ message: "Consumer ID already exists" });
        }

        // Generate unique ApplicationID
        const applicationID = await generateUniqueApplicationID();

        // Create a new instance of the ResNewData model
        const newData = new ResNewData({
            ApplicationID: applicationID,
            WardCommittee,
            ConsumerID,
            NewMeterNumber,
            Purpose,
            Type,
            Address,
            MeterImageData,
            MeterLatitude,
            MeterLongitude,
            SanctionLoad,
            TimerPanel,
            TimerPanelImage,
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
        const data = await ResNewData.find();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete data by ConsumerID
exports.deleteData = async (req, res) => {
    try {
        const { ConsumerID } = req.params;
        const deletedData = await ResNewData.findOneAndDelete({ ConsumerID });
        if (!deletedData) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Data deleted successfully", data: deletedData });
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Add new response to the Response array
exports.addResponse = async (req, res) => {
    try {
        const { ConsumerID } = req.params;
        const {
            WardCommittee,
            PoleName,
            HightofPole,
            TypeofBracket,
            Bracket,
            NumberLight,
            LightName,
            Watts,
            PoleImageData,
            PoleLatitude,
            PoleLongitude,
            TypesofCable // New field for Types of Cable
        } = req.body;

        // Construct new response data with TypesofCable
        const newResponseData = {
            WardCommittee,
            ConsumerID,
            TypeofPole: {
                PoleName,
                HightofPole,
                TypeofBracket,
                Bracket,
            },
            TypeofLight: {
                LightName,
                Watts,
            },
            NumberLight,
            PoleImageData,
            PoleLatitude,
            PoleLongitude,
            TypesofCable, // This assumes that TypesofCable is an array with the proper structure
            Date: moment().tz("Asia/Kolkata").format("YYYY-MM-DD"),
            Time: moment().tz("Asia/Kolkata").format("HH:mm:ss"),
        };

        // Find the document by ConsumerID and add new response data to the Response array
        const updatedData = await ResNewData.findOneAndUpdate(
            { ConsumerID },
            { $push: { Response: newResponseData } },
            { new: true }
        );

        if (!updatedData) {
            return res.status(404).json({ message: "Consumer ID not found" });
        }

        res.status(200).json({ message: "Response data added successfully", data: updatedData });
    } catch (error) {
        console.error("Error adding response data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a response from the Response array
exports.deleteResponse = async (req, res) => {
    try {
        const { ConsumerID, responseId } = req.params;

        // Find the document by ConsumerID and pull the response with the given responseId
        const updatedData = await ResNewData.findOneAndUpdate(
            { ConsumerID },
            { $pull: { Response: { _id: responseId } } },
            { new: true }
        );

        if (!updatedData) {
            return res.status(404).json({ message: "Consumer ID or Response not found" });
        }

        res.status(200).json({ message: "Response deleted successfully", data: updatedData });
    } catch (error) {
        console.error("Error deleting response:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Ward/Meter Count 
exports.wardCount = async (req, res) => {
    try {
        const result = await ResNewData.aggregate([
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



// Get the count of responses ward-wise
exports.getWardWiseResponseCount = async (req, res) => {
    try {
        const aggregateResult = await ResNewData.aggregate([
            { $unwind: "$Response" },
            {
                $group: {
                    _id: "$Response.WardCommittee",
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } },
        ]);

        const countsByWardCommittee = aggregateResult.map(item => ({
            wardCommittee: item._id,
            count: item.count
        }));

        res.status(200).json(countsByWardCommittee);
    } catch (error) {
        console.error("Error getting ward-wise response count:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller function to get data for today
exports.getDataForToday = async (req, res) => {
    const todayDate = new Date().toISOString().split('T')[0];

    try {
        const data = await ResNewData.find({ Date: todayDate });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data: " + error.message });
    }
};

//Month-Year
exports.getDataForMonthAndYear = async (req, res) => {
    const { month, year } = req.query;

    if (!month || !year) {
        return res.status(400).json({ error: "Month and year are required" });
    }

    // Construct regex for matching the date in "YYYY-MM-DD" format for the given month and year
    const datePattern = new RegExp(`^${year}-${month.padStart(2, '0')}`);

    try {
        const data = await ResNewData.find({ Date: { $regex: datePattern } });
        res.status(200).json(data);
        console.log(data.length);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data: " + error.message });
    }
};
