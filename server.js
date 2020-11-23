//import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

//load configuration from .env file
require('dotenv-flow').config();

//import routes and validation
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const dashboardRoutes = require("./routes/dashboard");
const { verifyToken } = require("./validation");

// middleware defitions
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//connect to the MongoDB using Mongoose ODM
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

//routes definition
app.get("/api/welcome", (req,res) => {
  res.status(200).send({message: "Welcome to the MEN-RESTful-API"});
});

// authentication routes to secure the API endpoints
app.use("/api/user", authRoutes); //authentication routes (register, login)
app.use("/api/products", productRoutes); //CRUD routes
app.use("/api/dashboard", verifyToken, dashboardRoutes);

//start up server
const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log("Server is running on port: " + PORT);
});

module.exports = app;