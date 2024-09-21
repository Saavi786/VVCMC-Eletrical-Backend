const mongoose = require("mongoose");

const ResNewSchema = new mongoose.Schema({
    ApplicationID:{
        type: String,
        unique:true
    },
    WardCommittee: {
        required:true,
        type: String
    },
    ConsumerID: {
        type: Number,
        unique: true
    },
    NewMeterNumber: {
        type: String
    },
    Purpose: {
        type: String
    },
    Type: {
        type: String
    },
    Address: {
        type: String
    },
    MeterImageData: {
        type: String
    },
    MeterLatitude: {
        type: String
    },
    MeterLongitude: {
        type: String
    },
    SanctionLoad:{
        type:String
    },
    TimerPanel:{
        type:String
    },
    TimerPanelImage:{
        type:String
    },
    Response: [
        {
            WardCommittee: {
                type: String
            },
            ConsumerID: {
                type: Number
            },
            TypeofPole: {
                PoleName: {
                    type: String
                },
                HightofPole: {
                    type: String
                },
                TypeofBracket: {
                    type: String
                },
                Bracket: {
                    type: String
                }
            },
            TypeofLight: {
                LightName: {
                    type: String
                },
                Watts: {
                    type: String
                }
            },
            NumberLight: {
                type: Number
            },
            PoleImageData: {
                type: String
            },
            PoleLatitude: {
                type: String
            },
            PoleLongitude: {
                type: String
            },
            Date: {
                type: String
            },
            Time: {
                type: String
            },
            // New field for Types of Cable with subtypes and watts
            TypesofCable: {
                CableType: {
                    type: String // e.g., "Type A"
                },
                SubTypeName: {
                    type: String // e.g., "SubType 1"
                },
                CableWatts: {
                    type: String // e.g., "100W"
                }
            }
        }
    ],
    Date: {
        type: String
    },
    Time: {
        type: String
    }
});

const ResNewData = mongoose.model("ResNewData", ResNewSchema);

module.exports = ResNewData;
