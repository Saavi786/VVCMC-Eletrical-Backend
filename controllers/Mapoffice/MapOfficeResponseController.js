const MapOfficeResponse = require('../../Model/MapOfficeAssets/MapOfficeResponseSchema');

// Add a new MapOfficeResponse with separate data fields
exports.addMapOfficeResponse = async (req, res) => {
    try {
        const {
            ResponseId,
            WardCommittee,
            TypeofBuilding,
            TotalSanctionLoad,
            ActualLoad,
            LiftInBuilding,
            Quantity,
            CompanyName,
            PersonCapacity,
            WeightCapacity,
            Image,
            Latitude,
            Longitude,
            Floor,
            CFL,
            CFLNo,
            LED,
            LEDNo,
            TubeNo,
            FanNo,
            ComputerNo,
            AC,
            WaterCoolerNo,
            ROFilterNo,
            Geyser
        } = req.body;

        const newResponse = new MapOfficeResponse({
            ResponseId,
            WardCommittee,
            TypeofBuilding,
            TotalSanctionLoad,
            ActualLoad,
            LiftInBuilding,
            Quantity,
            CompanyName,
            PersonCapacity,
            WeightCapacity,
            Image,
            Latitude,
            Longitude,
            Floor,
            CFL,
            CFLNo,
            LED,
            LEDNo,
            TubeNo,
            FanNo,
            ComputerNo,
            AC,
            WaterCoolerNo,
            ROFilterNo,
            Geyser
        });

        await newResponse.save();
        res.status(201).json(newResponse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all MapOfficeResponses
exports.getAllMapOfficeResponses = async (req, res) => {
    try {
        const responses = await MapOfficeResponse.find();
        res.status(200).json(responses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single MapOfficeResponse by ID
exports.getMapOfficeResponseById = async (req, res) => {
    try {
        const response = await MapOfficeResponse.findById(req.params.id);
        if (!response) {
            return res.status(404).json({ message: 'Response not found' });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a MapOfficeResponse by ID
exports.deleteMapOfficeResponse = async (req, res) => {
    try {
        const response = await MapOfficeResponse.findByIdAndDelete(req.params.id);
        if (!response) {
            return res.status(404).json({ message: 'Response not found' });
        }
        res.status(200).json({ message: 'Response deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
