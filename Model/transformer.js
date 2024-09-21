const mongoose = require("mongoose");

const TransformerSchema = new mongoose.Schema({

    ApplicatioId:{
        type:String,
        unique:true
    },
    WardCommittee:{
        type:String,
        
    },
    TransformerCapacity:{
        type:String,
        
    },
    DTCNumber:{
        type:Number,
        
    },

    Image:{
        name: String,
        data: Buffer,
        contentType: String,
    },

    ImageLat:{
        type:String,
        
    },
    ImageLong:{
        type:String,
        
    },
    Address:{
        type:String,
        
    }
  
});

const Transformerdata = mongoose.model("Transformerdata", TransformerSchema);

module.exports = Transformerdata;
