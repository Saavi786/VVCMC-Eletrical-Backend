const mongoose = require("mongoose");

const DB = "mongodb+srv://rizwanikhan63:root@cluster0.n0mstat.mongodb.net/vvcmtest?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB).then(()=>console.log("DB Connected")).catch((err)=>console.log(err.message));