const MapOfficeStatic = require('../../Model/MapOfficeAssets/MapOfficeStaticSchema');

// Add new data
exports.addNewData = async (req, res) => {
    const { WardCommittee, TypeofBuilding, Floor, CFL, LED, AC } = req.body;

    try {
        const newData = new MapOfficeStatic({
            WardCommittee,
            TypeofBuilding,
            Floor,
            CFL,
            LED,
            AC
        });

        const savedData = await newData.save();
        res.status(201).json({ message: 'New data added successfully', data: savedData });
    } catch (error) {
        console.error('Error adding new data:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all data
exports.getAllData = async (req, res) => {
    try {
        const allData = await MapOfficeStatic.find();
        res.status(200).json(allData);
    } catch (error) {
        console.error('Error fetching all data:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


// Add element to WardCommittee
exports.addWardCommittee = async (req, res) => {
    const id = "66844089abdd716841c67359";
    const { newValue } = req.body;
    try {
        const mapOfficeStatic = await MapOfficeStatic.findByIdAndUpdate(
            id,
            { $push: { WardCommittee: newValue } },
            { new: true, useFindAndModify: false }
        );
        if (!mapOfficeStatic) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'WardCommittee element added successfully', data: mapOfficeStatic });
    } catch (error) {
        console.error('Error adding element to WardCommittee:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete element from WardCommittee
exports.deleteWardCommittee = async (req, res) => {
    const id = "66844089abdd716841c67359";
    const { valueToDelete } = req.body;
    try {
        const mapOfficeStatic = await MapOfficeStatic.findByIdAndUpdate(
            id,
            { $pull: { WardCommittee: valueToDelete } },
            { new: true, useFindAndModify: false }
        );
        if (!mapOfficeStatic) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'WardCommittee element deleted successfully', data: mapOfficeStatic });
    } catch (error) {
        console.error('Error deleting element from WardCommittee:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add element to TypeofBuilding
exports.addTypeofBuilding = async (req, res) => {
    const id = "66844089abdd716841c67359";
    const { newValue } = req.body;
    try {
        const mapOfficeStatic = await MapOfficeStatic.findByIdAndUpdate(
            id,
            { $push: { TypeofBuilding: newValue } },
            { new: true, useFindAndModify: false }
        );
        if (!mapOfficeStatic) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'TypeofBuilding element added successfully', data: mapOfficeStatic });
    } catch (error) {
        console.error('Error adding element to TypeofBuilding:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete element from TypeofBuilding
exports.deleteTypeofBuilding = async (req, res) => {
    const id = "66844089abdd716841c67359";
    const { valueToDelete } = req.body;
    try {
        const mapOfficeStatic = await MapOfficeStatic.findByIdAndUpdate(
            id,
            { $pull: { TypeofBuilding: valueToDelete } },
            { new: true, useFindAndModify: false }
        );
        if (!mapOfficeStatic) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'TypeofBuilding element deleted successfully', data: mapOfficeStatic });
    } catch (error) {
        console.error('Error deleting element from TypeofBuilding:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add element to Floor
exports.addFloor = async (req, res) => {
    const id = "66844089abdd716841c67359";
    const { newValue } = req.body;
    try {
        const mapOfficeStatic = await MapOfficeStatic.findByIdAndUpdate(
            id,
            { $push: { Floor: newValue } },
            { new: true, useFindAndModify: false }
        );
        if (!mapOfficeStatic) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'Floor element added successfully', data: mapOfficeStatic });
    } catch (error) {
        console.error('Error adding element to Floor:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete element from Floor
exports.deleteFloor = async (req, res) => {
    const id = "66844089abdd716841c67359";
    const { valueToDelete } = req.body;
    try {
        const mapOfficeStatic = await MapOfficeStatic.findByIdAndUpdate(
            id,
            { $pull: { Floor: valueToDelete } },
            { new: true, useFindAndModify: false }
        );
        if (!mapOfficeStatic) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'Floor element deleted successfully', data: mapOfficeStatic });
    } catch (error) {
        console.error('Error deleting element from Floor:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add element to CFL
exports.addCFL = async (req, res) => {
    const id = "66844089abdd716841c67359";
    const { newValue } = req.body;
    try {
        const mapOfficeStatic = await MapOfficeStatic.findByIdAndUpdate(
            id,
            { $push: { CFL: newValue } },
            { new: true, useFindAndModify: false }
        );
        if (!mapOfficeStatic) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'CFL element added successfully', data: mapOfficeStatic });
    } catch (error) {
        console.error('Error adding element to CFL:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete element from CFL
exports.deleteCFL = async (req, res) => {
    const id = "66844089abdd716841c67359";
    const { valueToDelete } = req.body;
    try {
        const mapOfficeStatic = await MapOfficeStatic.findByIdAndUpdate(
            id,
            { $pull: { CFL: valueToDelete } },
            { new: true, useFindAndModify: false }
        );
        if (!mapOfficeStatic) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'CFL element deleted successfully', data: mapOfficeStatic });
    } catch (error) {
        console.error('Error deleting element from CFL:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add element to LED
exports.addLED = async (req, res) => {
    const id = "66844089abdd716841c67359";
    const { newValue } = req.body;
    try {
        const mapOfficeStatic = await MapOfficeStatic.findByIdAndUpdate(
            id,
            { $push: { LED: newValue } },
            { new: true, useFindAndModify: false }
        );
        if (!mapOfficeStatic) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'LED element added successfully', data: mapOfficeStatic });
    } catch (error) {
        console.error('Error adding element to LED:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete element from LED
exports.deleteLED = async (req, res) => {
    const id = "66844089abdd716841c67359";
    const { valueToDelete } = req.body;
    try {
        const mapOfficeStatic = await MapOfficeStatic.findByIdAndUpdate(
            id,
            { $pull: { LED: valueToDelete } },
            { new: true, useFindAndModify: false }
        );
        if (!mapOfficeStatic) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'LED element deleted successfully', data: mapOfficeStatic });
    } catch (error) {
        console.error('Error deleting element from LED:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add element to AC
exports.addAC = async (req, res) => {
    const id = "66844089abdd716841c67359";
    const { newValue } = req.body;
    try {
        const mapOfficeStatic = await MapOfficeStatic.findByIdAndUpdate(
            id,
            { $push: { AC: newValue } },
            { new: true, useFindAndModify: false }
        );
        if (!mapOfficeStatic) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'AC element added successfully', data: mapOfficeStatic });
    } catch (error) {
        console.error('Error adding element to AC:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete element from AC
exports.deleteAC = async (req, res) => {
    const id = "66844089abdd716841c67359";
    const { valueToDelete } = req.body;
    try {
        const mapOfficeStatic = await MapOfficeStatic.findByIdAndUpdate(
            id,
            { $pull: { AC: valueToDelete } },
            { new: true, useFindAndModify: false }
        );
        if (!mapOfficeStatic) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'AC element deleted successfully', data: mapOfficeStatic });
    } catch (error) {
        console.error('Error deleting element from AC:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

