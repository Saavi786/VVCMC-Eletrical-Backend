const mongoose = require("mongoose");

const DB = "mongodb://127.0.0.1:27017/testvv?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1";

mongoose.connect(DB).then(()=>console.log("DB Connected")).catch((err)=>console.log(err.message));