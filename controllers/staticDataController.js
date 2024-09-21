const db = require("./../Model/db");

// Delete Ward from WardCommittee array
module.exports.deleteWard = async (req, res) => {
    const { ward } = req.params;
    const id = "662f371d3f5203992148b9e8";
    try {
        const staticData = await db.findById(id);
        if (!staticData) {
            return res.status(404).json({ error: "Static data document not found" });
        }

        const elementIndex = staticData.WardCommittee.indexOf(ward);
        if (elementIndex === -1) {
            return res.status(404).json({ error: "Element to delete not found in WardCommittee array" });
        }

        staticData.WardCommittee.splice(elementIndex, 1);

        await staticData.save();
        return res.status(200).json({ message: "Ward deleted successfully" });
    } catch (error) {
        console.error("Error deleting WardCommittee element:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Delete Purpose 
module.exports.deletePurpose = async (req, res) => {
    const { purpose } = req.params;
    const id = "662f371d3f5203992148b9e8";
    try {
        const staticData = await db.findById(id);
        if (!staticData) {
            return res.status(404).json({ error: "Static data document not found" });
        }
        const elementIndex = staticData.Purpose.indexOf(purpose);
        if (elementIndex === -1) {
            return res.status(404).json({ error: "Element to delete not found in Purpose array" });
        }
        staticData.Purpose.splice(elementIndex, 1);
        await staticData.save();
        console.log("Purpose element deleted successfully!");
        return res.status(200).json({ message: "Purpose element deleted successfully" });
    } catch (error) {
        console.log("Error While Deleting Data");
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Delete Type
module.exports.deleteType = async (req, res) => {
    const { type } = req.params;
    const id = "662f371d3f5203992148b9e8";
    try {
        const staticData = await db.findById(id);
        if (!staticData) {
            return res.status(404).json({ error: "Static data document not found" });
        }
        const elementIndex = staticData.Type.indexOf(type);
        if (elementIndex === -1) {
            return res.status(404).json({ error: "Element to delete not found in Type array" });
        }
        staticData.Type.splice(elementIndex, 1);
        await staticData.save();
        console.log("Type element deleted successfully!");
        return res.status(200).json({ message: "Type element deleted successfully" });
    } catch (error) {
        console.log("Error While Deleting Data");
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

//Delete Consumer Number
module.exports.deleteConsumerID = async (req, res) => {
    const { consumerNumber } = req.params;
    const id = "662f371d3f5203992148b9e8";
    try {
        const staticData = await db.findById(id);
        if (!staticData) {
            return res.status(404).json({ error: "Static data document not found" });
        }
        const elementIndex = staticData.ConsumerIDs.indexOf(consumerNumber);
        if (elementIndex === -1) {
            return res.status(404).json({ error: "Element to delete not found in ConsumerNumber array" });
        }
        staticData.ConsumerIDs.splice(elementIndex, 1);
        await staticData.save();
        console.log("Consumer ID deleted successfully!");
        return res.status(200).json({ message: "Consumer ID deleted successfully" });
    } catch (error) {
        console.log("Error While Deleting Data");
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

//Delete Pole
module.exports.deletePoleByName = async (req, res) => {
    const { poleName } = req.params;
    const id = "662f371d3f5203992148b9e8";

    try {
        const result = await db.findByIdAndUpdate(
            id,
            { $pull: { TypeofPole: { PoleName: poleName } } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "Document not found" });
        }

        res.status(200).json({ message: "Pole object deleted successfully", data: result });
    } catch (error) {
        console.error("Error deleting pole object:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

//Delete Light
module.exports.deleteLightByName = async (req, res) => {
    const { lightName } = req.params;
    const id = "662f371d3f5203992148b9e8";

    try {
        const result = await db.findByIdAndUpdate(
            id,
            { $pull: { TypeofLight: { LightName: lightName } } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "Document not found" });
        }

        res.status(200).json({ message: "Light object deleted successfully", data: result });
    } catch (error) {
        console.error("Error deleting Light object:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

//Delete Height of Pole
module.exports.deletePoleHeight = async (req, res) => {
    const { poleName, height } = req.params;
    const id = "662f371d3f5203992148b9e8";

    try {
        const result = await db.findOneAndUpdate(
            { _id: id, "TypeofPole.PoleName": poleName },
            { $pull: { "TypeofPole.$.HightofPole": height } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "Document or PoleName not found" });
        }

        res.status(200).json({ message: "Height deleted successfully", data: result });
    } catch (error) {
        console.error("Error deleting height:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

//Delete Type of Bracket
module.exports.deleteTypeBracket = async (req, res) => {
    const { poleName, typeBracket } = req.params;
    const id = "662f371d3f5203992148b9e8";

    try {
        const result = await db.findOneAndUpdate(
            { _id: id, "TypeofPole.PoleName": poleName },
            { $pull: { "TypeofPole.$.TypeofBracket": typeBracket } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "Document or PoleName not found" });
        }

        res.status(200).json({ message: "Type of Bracket deleted successfully", data: result });
    } catch (error) {
        console.error("Error deleting Type of Bracket:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

//  Delete Bracket
module.exports.deleteBracket = async (req, res) => {
    const { poleName, bracket } = req.params;
    const id = "662f371d3f5203992148b9e8";

    try {
        const result = await db.findOneAndUpdate(
            { _id: id, "TypeofPole.PoleName": poleName },
            { $pull: { "TypeofPole.$.Bracket": bracket } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "Document or PoleName not found" });
        }

        res.status(200).json({ message: "Bracket Deleted successfully", data: result });
    } catch (error) {
        console.error("Error Deleting Bracket:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete Watts
module.exports.deleteWatts = async (req, res) => {
    const { lightName, watts } = req.params;
    const id = "662f371d3f5203992148b9e8";

    try {
        const result = await db.findOneAndUpdate(
            { _id: id, "TypeofLight.LightName": lightName },
            { $pull: { "TypeofLight.$.Watts": watts } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "Document or LightName not found" });
        }

        res.status(200).json({ message: "Watts Deleted successfully", data: result });
    } catch (error) {
        console.error("Error Deleting Watts:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Function to add a new Ward
module.exports.addWard = async (req, res) => {
    const id = "662f371d3f5203992148b9e8"; // Document ID
    const { ward } = req.body; // New LightName

    try {
        // Find the document by ID and update the TypeofLight array
        const result = await db.findByIdAndUpdate(
            id,
            { $push: { WardConsumer: { Ward: ward, ConsumerID: [] } } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: 'Document not found' });
        }

        return res.status(200).json({ message: 'Ward added successfully', data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
