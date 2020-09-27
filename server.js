//import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//setup database connection to mongoDB atlas
const uri = "mongodb+srv://db_user:1234easv@cluster0.usxmc.mongodb.net/shop?retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

//start up server
var port = 4000;
app.listen(port, function () {
  console.log("Server is running on Port: " + port);
});

var product = require('./model');

var create = function (req, res) {
  data = req.body;
  product.insertMany(data)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); });
}

var retrieve = function (req, res) {
  //advanced query by name
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};   
  product.find(condition)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); });
}


var retrieveById = function (req, res) {
  product.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); });
}

var retrieveInStock = function (req, res) {
  product.find({ inStock: true })
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); })
}

var update = function (req, res) {
  const id = req.params.id;

  product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Cannot update product with id=${id}. Maybe product was not found!` });
      else
        res.send({ message: "Product was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating Product with id=" + id });
    });

}

var remove = function (req, res) {
  const id = req.params.id;

  product.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } 
      else { res.send({ message: "Tutorial was deleted successfully!" }); }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete Tutorial with id=" + id }); });
}

//-------------------------------------------------
// CRUD routes
//-------------------------------------------------
app.post("/products", create);
app.get("/products", retrieve);
app.get("/products/instock", retrieveInStock);
app.get("/products/:id", retrieveById);
app.put("/products/:id", update);
app.delete("/products/:id", remove);





