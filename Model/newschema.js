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
    Response: [
        {
            WardCommittee: {
                type: String,
            },
            ConsumerID: {
                type: Number,
            },
            TypeofPole: {
                PoleName: {
                    type: String,
                },
                HightofPole: {
                    type: String,
                },
                TypeofBracket: {
                    type: String,
                },
                Bracket: {
                    type: String,
                },
            },
            TypeofLight: {
                LightName: {
                    type: String,
                },
                Watts: {
                    type: String,
                }
            },
            NumberLight: {
                type: Number,
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
