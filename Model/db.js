const mongoose = require("mongoose");


const DataSchema = new mongoose.Schema({
    WardCommittee: [String],
    Purpose: [String],
    Type: [String],
    TypeofPole: [
        {
            PoleName: {
                type: String
            },
            HightofPole: [String],
            TypeofBracket: [String],
            Bracket: [String],
        }
    ],
    TypeofLight: [
        {
            LightName: {
                type: String,
            },
            Watts: [String]
        }
    ],
    WardConsumer:[
        {
            Ward:{
                type:String,      
            },
            ConsumerID:[String]
        }
    ]
})

const StaticData = mongoose.model("StaticData", DataSchema);

module.exports = StaticData;