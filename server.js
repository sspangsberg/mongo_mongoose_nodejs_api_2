//import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();

//import routes and 
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const dashboardRoutes = require("./routes/dashboard");
const { verifyToken } = require("./validation");

dotenv.config();

// middleware defitions
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_CONNECT, 
  { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
  });

  mongoose.connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

//welcome route
app.get("/api/welcome", (req, res) => { 
  res.status(200).json({ message: "Welcome to this awesome API"});    
});

// authentication routes to secure the API endpoints
app.use("/api/user", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard" , verifyToken, dashboardRoutes);

//start up server
const port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log("Server is running on Port: " + port);
});

module.exports = app;