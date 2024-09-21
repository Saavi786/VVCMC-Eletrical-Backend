const ResData  = require("./../Model/ResSchema");

// Controller function to get data for today
exports.getDataForToday = async (req, res) => {
    const todayDate = new Date().toISOString().split('T')[0];

    try {
        const data = await ResData.find({ Date: todayDate });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data: " + error.message });
    }
};

// Controller function to get count of each distinct WardCommittee for today
exports.getWardCommitteeCountsForToday = async (req, res) => {
    const todayDate = new Date().toISOString().split('T')[0];

    try {
        const counts = await ResData.aggregate([
            {
                $match: { Date: todayDate }
            },
            {
                $group: {
                    _id: "$WardCommittee",
                    count: { $sum: 1 }
                }
            },{ $sort: { _id: 1 } }
        ]);
        const countsByWardCommittee = counts.map(item => ({
            wardCommittee: item._id,
            count: item.count
        }));
        res.status(200).json(countsByWardCommittee);
    } catch (error) {
        res.status(500).json({ error: "Error fetching WardCommittee counts: " + error.message });
    }
};

// Controller function to get data for a specific month and year
exports.getDataForMonthAndYear = async (req, res) => {
    const { month, year } = req.query;

    if (!month || !year) {
        return res.status(400).json({ error: "Month and year are required" });
    }

    // Construct regex for matching the date in "YYYY-MM-DD" format for the given month and year
    const datePattern = new RegExp(`^${year}-${month.padStart(2, '0')}`);

    try {
        const data = await ResData.find({ Date: { $regex: datePattern } });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data: " + error.message });
    }
};

// Controller function to get count of each distinct WardCommittee for a specific month and year
exports.getWardCommitteeCountsForMonthAndYear = async (req, res) => {
    const { month, year } = req.query;

    if (!month || !year) {
        return res.status(400).json({ error: "Month and year are required" });
    }

    // Construct regex for matching the date in "YYYY-MM-DD" format for the given month and year
    const datePattern = new RegExp(`^${year}-${month.padStart(2, '0')}`);

    try {
        const counts = await ResData.aggregate([
            {
                $match: { Date: { $regex: datePattern } }
            },
            {
                $group: {
                    _id: "$WardCommittee",
                    count: { $sum: 1 }
                }
            },{ $sort: { _id: 1 } }
        ]);
        const countsByWardCommittee = counts.map(item => ({
            wardCommittee: item._id,
            count: item.count
        }));
        res.status(200).json(countsByWardCommittee);
    } catch (error) {
        res.status(500).json({ error: "Error fetching WardCommittee counts: " + error.message });
    }
};


exports.getPoleNameCountsForDate = async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ error: "Date is required" });
    }

    try {
        const poleCount = await ResData.countDocuments({ Date: date, 'TypeofPole.PoleName': { $exists: true, $ne: "" } });
        res.status(200).json({ poleCount });
    } catch (error) {
        console.error('Error getting pole count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to get count of LightName for a specific date
exports.getLightNameCountsForDate = async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ error: "Date is required" });
    }

    try {
        const lightCount = await ResData.countDocuments({ Date: date, 'TypeofLight.LightName': { $exists: true, $ne: "" } });
        res.status(200).json({ lightCount });
    } catch (error) {
        console.error('Error getting light count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to get count of PoleName for a specific month and year
exports.getPoleNameCountsForMonthYear = async (req, res) => {
    const { month, year } = req.query;

    if (!month || !year) {
        return res.status(400).json({ error: "Month and year are required" });
    }

    // Construct regex for matching the date in "YYYY-MM-DD" format for the given month and year
    const datePattern = new RegExp(`^${year}-${month.padStart(2, '0')}`);

    try {
        const poleCount = await ResData.countDocuments({ Date: { $regex: datePattern }, 'TypeofPole.PoleName': { $exists: true, $ne: "" } });
        res.status(200).json({ poleCount });
    } catch (error) {
        console.error('Error getting pole count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to get count of LightName for a specific month and year
exports.getLightNameCountsForMonthYear = async (req, res) => {
    const { month, year } = req.query;

    if (!month || !year) {
        return res.status(400).json({ error: "Month and year are required" });
    }

    // Construct regex for matching the date in "YYYY-MM-DD" format for the given month and year
    const datePattern = new RegExp(`^${year}-${month.padStart(2, '0')}`);

    try {
        const lightCount = await ResData.countDocuments({ Date: { $regex: datePattern }, 'TypeofLight.LightName': { $exists: true, $ne: "" } });
        res.status(200).json({ lightCount });
    } catch (error) {
        console.error('Error getting light count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
