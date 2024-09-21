const mongoose = require("mongoose");

const MapOfficeResponseSchema = new mongoose.Schema({
    ResponseId: {
        type: String
    },
    WardCommittee: {
        type: String
    },
    TypeofBuilding: {
        type: String
    },
    TotalSanctionLoad: {
        type: String
    },
    ActualLoad: {
        type: String
    },
    LiftInBuilding: {
        type: String
    },
    Quantity: {
        type: String
    },
    CompanyName: {
        type: String
    },
    PersonCapacity: {
        type: String
    },
    WeightCapacity: {
        type: String
    },
    Image: {
        type: String
    },
    Latitude: {
        type: String
    },
    Longitude: {
        type: String
    },
    Floor: {
        type: String
    },
    CFL: {
        type: String
    },
    CFLNo: {
        type: String
    },
    LED: {
        type: String
    },
    LEDNo: {
        type: String
    },
    TubeNo: {
        type: String
    },
    FanNo: {
        type: String
    },
    ComputerNo: {
        type: String
    },
    AC: {
        type: String
    },
    WaterCoolerNo: {
        type: String
    },
    ROFilterNo: {
        type: String
    },
    Geyser: {
        type: String
    }

});

const MapOfficeResponse = mongoose.model('MapOfficeResponse', MapOfficeResponseSchema);

module.exports = MapOfficeResponse;
