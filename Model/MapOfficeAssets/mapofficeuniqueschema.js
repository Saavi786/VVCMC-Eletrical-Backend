const mongoose = require('mongoose');

const Countermapofficeschema = new mongoose.Schema({

    _id1: {
        type:String,
        required:true
     },
    seq1: { 
        type:Number,
        default:0
    }

});

const countmapoffice = mongoose.model('countmapoffice', Countermapofficeschema);

module.exports = countmapoffice;