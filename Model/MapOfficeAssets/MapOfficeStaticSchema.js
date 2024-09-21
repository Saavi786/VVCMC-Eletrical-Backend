const mongoose = require('mongoose');

const MapOfficeStaticSchema = new mongoose.Schema({
    WardCommittee:[String],
    TypeofBuilding:[String],
    Floor:[String],
    CFL:[String],
    LED:[String],
    AC:[String]
});

const MapOfficeStatic = mongoose.model("MapOfficeStatic",MapOfficeStaticSchema);

module.exports=MapOfficeStatic;