//import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
require('dotenv-flow').config();
const app = express();

//import routes and 
//const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
//const dashboardRoutes = require("./routes/dashboard");
//const { verifyToken } = require("./validation");

//dotenv.config();

// middleware defitions
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect
(
  process.env.DB_HOST, 
  { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
  }
);
mongoose.connection.on('error', console.error.bind(console, 'Connection error:'));
mongoose.connection.once('open', console.error.bind(console, 'Connected succesfully to MongoDB:' + process.env.DB_HOST));

// authentication routes to secure the API endpoints
//app.use("/api/user", authRoutes);
app.use("/api/products", productRoutes);
//app.use("/api/dashboard" , verifyToken, dashboardRoutes);

//start up server
const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

module.exports = app;