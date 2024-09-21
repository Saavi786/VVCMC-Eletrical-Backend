const express = require("express");
const router = new express.Router();
const StaticData = require("../Model/db");
const ResData = require("../Model/ResSchema");
const moment = require("moment-timezone");

//get method
//Get Count
router.get("/ward-committee-count", async (req, res) => {
  try {
    // Use aggregation pipeline to group by WardCommittee and count each group,
    // then sort the results alphabetically
    const result = await ResData.aggregate([
      { $group: { _id: "$WardCommittee", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }, // Sort by _id (WardCommittee) in ascending order
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
});

//Get Response data
router.get("/get-data", async (req, res) => {
  try {
    // Retrieve all data from the database
    const data = await ResData.find();

    // Send the data as a response
    res.status(200).json(data);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get data by ID
router.get("/data", async (req, res) => {
  const id = "662f371d3f5203992148b9e8";
  // Document ID

  try {
    // Find document by ID
    const data = await StaticData.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update-ward-committee", async (req, res) => {
  const id = "662f371d3f5203992148b9e8"; // Document ID
  const { newWardData } = req.body; // New array data to add

  try {
    // Find the document by ID and update the WardCommittee array
    const result = await StaticData.findByIdAndUpdate(
      id,
      { $push: { WardCommittee: newWardData } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res
      .status(200)
      .json({ message: "WardCommittee array data updated", data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Purpose section
router.put("/update-purpose", async (req, res) => {
  const id = "662f371d3f5203992148b9e8"; // Document ID
  const { newPurposeData } = req.body; // New array data to add

  try {
    // Find the document by ID and update the WardCommittee array
    const result = await StaticData.findByIdAndUpdate(
      id,
      { $push: { Purpose: newPurposeData } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res
      .status(200)
      .json({ message: "Purpose array data updated", data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Types
router.put("/Type", async (req, res) => {
  const id = "662f371d3f5203992148b9e8"; // Document ID
  const { Types } = req.body; // New array data to add

  try {
    // Find the document by ID and update the WardCommittee array
    const result = await StaticData.findByIdAndUpdate(
      id,
      { $push: { Type: Types } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res
      .status(200)
      .json({ message: "Purpose array data updated", data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Types of Light
router.put("/add-light-name", async (req, res) => {
  const id = "662f371d3f5203992148b9e8"; // Document ID
  const { lightName } = req.body; // New LightName

  try {
    // Find the document by ID and update the TypeofLight array
    const result = await StaticData.findByIdAndUpdate(
      id,
      { $push: { TypeofLight: { LightName: lightName, Watts: [] } } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res
      .status(200)
      .json({ message: "LightName added successfully", data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Type of Pole
router.put("/add-pole-name", async (req, res) => {
  const id = "662f371d3f5203992148b9e8"; // Document ID
  const { poleName } = req.body; // New PoleName and related details

  try {
    // Find the document by ID and update the TypeofPole array
    const result = await StaticData.findByIdAndUpdate(
      id,
      {
        $push: {
          TypeofPole: {
            PoleName: poleName,
            HightofPole: [],
            TypeofBracket: [],
            Bracket: [],
          },
        },
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res
      .status(200)
      .json({ message: "PoleName added successfully", data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Add Pole Height
router.put("/add-pole-height/:poleName", async (req, res) => {
  const id = "662f371d3f5203992148b9e8"; // Document ID
  const { poleName } = req.params; // PoleName
  const { poleHeight } = req.body; // PoleName and Height of Pole data

  try {
    // Find the document by ID
    const doc = await StaticData.findById(id);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Find the PoleName in TypeofPole array
    const pole = doc.TypeofPole.find((pole) => pole.PoleName === poleName);

    if (!pole) {
      return res.status(404).json({ message: "PoleName not found" });
    }

    // Add Pole Height data to the existing PoleName
    pole.HightofPole.push(poleHeight);

    // Save the updated document
    const updatedDoc = await doc.save();

    return res
      .status(200)
      .json({
        message: "Pole Height data added successfully",
        data: updatedDoc,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Add Type of Bracket
router.put("/add-bracket-type/:poleName", async (req, res) => {
  const id = "662f371d3f5203992148b9e8"; // Document ID
  const { poleName } = req.params; // PoleName
  const { bracketType } = req.body; // PoleName and Bracket Type data

  try {
    // Find the document by ID
    const doc = await StaticData.findById(id);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Find the PoleName in TypeofPole array
    const pole = doc.TypeofPole.find((pole) => pole.PoleName === poleName);

    if (!pole) {
      return res.status(404).json({ message: "PoleName not found" });
    }

    // Add Bracket Type data to the existing PoleName
    pole.TypeofBracket.push(bracketType);

    // Save the updated document
    const updatedDoc = await doc.save();

    return res
      .status(200)
      .json({
        message: "Bracket Type data added successfully",
        data: updatedDoc,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Add Bracket Data
router.put("/add-bracket/:poleName", async (req, res) => {
  const id = "662f371d3f5203992148b9e8"; // Document ID
  const { poleName } = req.params; // PoleName
  const { bracketData } = req.body; // Bracket data

  try {
    // Find the document by ID
    const doc = await StaticData.findById(id);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Find the PoleName in TypeofPole array
    const pole = doc.TypeofPole.find((pole) => pole.PoleName === poleName);

    if (!pole) {
      return res.status(404).json({ message: "PoleName not found" });
    }

    // Add Bracket data directly to the PoleName
    pole.Bracket.push(bracketData);

    // Save the updated document
    const updatedDoc = await doc.save();

    return res
      .status(200)
      .json({ message: "Bracket data added successfully", data: updatedDoc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Add watts
router.put("/add-watts/:lightName", async (req, res) => {
  const id = "662f371d3f5203992148b9e8"; // Document ID
  const { lightName } = req.params; // LightName
  const { wattsData } = req.body; // LightName and Watts data

  try {
    // Find the document by ID
    const doc = await StaticData.findById(id);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Find the LightName in TypeofLight array
    const light = doc.TypeofLight.find(
      (light) => light.LightName === lightName
    );

    if (!light) {
      return res.status(404).json({ message: "LightName not found" });
    }

    // Add Watts data to the existing LightName
    light.Watts.push(wattsData);

    // Save the updated document
    const updatedDoc = await doc.save();

    return res
      .status(200)
      .json({ message: "Watts data added successfully", data: updatedDoc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Add Response Data
// router.post("/add-data", async (req, res) => {
//   try {
//     // Extract data from the request body
//     const {
//       WardCommittee,
//       ConsumerID,
//       NewMeterNumber,
//       Purpose,
//       Type,
//       Address,
//       PoleName,
//       HightofPole,
//       TypeofBracket,
//       Bracket,
//       NumberLight,
//       LightName,
//       Watts,
//       MeterImageData,
//       MeterLatitude,
//       MeterLongitude,
//       PoleImageData,
//       PoleLatitude,
//       PoleLongitude,
//     } = req.body;

//     // Check if the ConsumerID already exists
//     const existingData = await ResData.findOne({ ConsumerID });
//     if (existingData) {
//       return res.status(400).json({ message: "Consumer ID already exists" });
//     }

//     // Create a new instance of the ResData model
//     const newData = new ResData({
//       WardCommittee,
//       ConsumerID,
//       NewMeterNumber,
//       Purpose,
//       Type,
//       TypeofPole: {
//         PoleName,
//         HightofPole,
//         TypeofBracket,
//         Bracket,
//       },
//       Address,
//       TypeofLight: {
//         LightName,
//         Watts,
//       },
//       NumberLight,
//       MeterImageData,
//       MeterLatitude,
//       MeterLongitude,
//       PoleImageData,
//       PoleLatitude,
//       PoleLongitude,
//       Date: moment().tz("Asia/Kolkata").format("YYYY-MM-DD"),
//       Time: moment().tz("Asia/Kolkata").format("HH:mm:ss"),
//     });

//     // Save the new data to the database
//     const savedData = await newData.save();

//     // Send a success response
//     res
//       .status(201)
//       .json({ message: "Data saved successfully", data: savedData });
//   } catch (error) {
//     // Handle errors
//     console.error("Error adding data:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// Route to get count of poles
router.get("/pole-count", async (req, res) => {
  try {
    const poleCount = await ResData.countDocuments({
      "TypeofPole.PoleName": { $exists: true, $ne: "" },
    });
    res.status(200).json({ poleCount });
  } catch (error) {
    console.error("Error getting pole count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get count of street lights
router.get("/street-light-count", async (req, res) => {
  try {
    const streetLightCount = await ResData.aggregate([
      {
        $match: {
          "TypeofLight.LightName": { $exists: true, $ne: "" },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);

    const count = streetLightCount.length > 0 ? streetLightCount[0].count : 0;
    res.status(200).json({ streetLightCount: count });
  } catch (error) {
    console.error("Error getting street light count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Add Consumer Number
router.put("/update-Consumer-List", async (req, res) => {
  const id = "662f371d3f5203992148b9e8"; // Document ID
  const { ConsumerId } = req.body; // New array data to add

  try {
    // Find the document by ID and update the WardCommittee array
    const result = await StaticData.findByIdAndUpdate(
      id,
      { $push: { ConsumerIDs: ConsumerId } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.status(200).json({ message: "data updated", data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete Response
router.delete("/data/:id", async (req, res) => {
  const id = req.params.id; // Get the ID from request params

  try {
    // Find the document by ID and delete it
    const deletedData = await ResData.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res
      .status(200)
      .json({ message: "Data deleted successfully", data: deletedData });
  } catch (error) {
    console.error("Error deleting data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/add-consumer-id/:wardName", async (req, res) => {
  const id = "662f371d3f5203992148b9e8"; // Replace with your actual document ID
  const { wardName } = req.params; // Ward Name from URL
  const { consumerID } = req.body; // Consumer ID from request body

  try {
    // Find the document by ID
    const doc = await StaticData.findById(id);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Find the ward within the WardConsumer array
    const wardIndex = doc.WardConsumer.findIndex(
      (ward) => ward.Ward === wardName
    );

    if (wardIndex === -1) {
      return res.status(404).json({ message: "Ward not found" });
    }

    // Add Consumer ID to the existing ward's ConsumerID array
    doc.WardConsumer[wardIndex].ConsumerID.push(consumerID);

    // Save the updated document
    const updatedDoc = await doc.save();

    return res
      .status(200)
      .json({ message: "Consumer ID added successfully", data: updatedDoc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
