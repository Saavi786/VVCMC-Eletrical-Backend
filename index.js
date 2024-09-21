const express = require("express");
// const serverless = require("serverless-http")
const cors = require("cors");
const bodyParser = require('body-parser');
require("./config/DBConn");
const router = require("./routes/router");
const staticRoute = require('./routes/staticRoute');
const adminRoutes = require('./routes/adminLoginRoute');
const rseRoute = require("./routes/resRoute");
const newRoute = require('./routes/newRoute');
const imageRoutes = require("./routes/imageRoutes");
const MapOfficeStaticRoute = require("./routes/Mapofficeassets/MapOfficeStaticRoute");
const MapOfficeResponseRoute = require("./routes/Mapofficeassets/MapOfficeResponseRoute")

//transformer
const transformerRoutes = require('./routes/transformerroute');

//MapofficeData
const MapofficeData = require('./routes/Mapofficeassets/mapofficeassets');

const app = express();
// app.use(express.json());
app.use(express.json({ limit: '1mb' }));
app.use(cors());
app.use(router);
app.use(staticRoute);
app.use(rseRoute);
app.use(newRoute);
app.use('/admin', adminRoutes);
app.use('/api', imageRoutes);
app.use('/map', MapOfficeStaticRoute);
app.use('/map', MapOfficeResponseRoute);


//transformerdata
app.use(transformerRoutes);

//mapofficedata
// app.use(MapofficeData);


app.get('/',(req,res)=>{
    res.send("Hello back");
});



app.listen(
    8000,()=>{
        console.log("Server is Running on 8000")
    }
);

// module.exports.handler = serverless(app); // export the handler for AWS Lambda
