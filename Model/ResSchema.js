const mongoose = require("mongoose");

const ResSchema = new mongoose.Schema({
    WardCommittee: {
        type: String,
        required: true
    },
    ConsumerID: {
        type: Number,
        required: true,
        unique: true
    },
    NewMeterNumber:{
        type: String
    },
    Purpose: {
        type: String,
    },
    Type: {
        type: String,
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
    Address:{
        type: String
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
    MeterImageData: {
        type: String
    },
    MeterLatitude: {
        type: String
    },
    MeterLongitude: {
        type: String
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
    Date:{
        type: String
    },
    Time:{
        type: String
    }
});

const ResData = mongoose.model("ResData", ResSchema);

module.exports = ResData;
