//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Product = require('../models/product');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

// Empty database before tests
before(function() { //Before each test we empty the database
  
  Product.deleteMany({}, function(err) {
    //done();
  });
});

/*
 * Test the /GET route
 */
describe('/Product CRUD operations', function() {
  
  it('should GET all the products', function(done) {
    chai.request(server)
      .get('/api/products')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  });


  it('should POST an invalid product', function(done) {
    let product = {
      name: "Invalid Product Test",
      description: "Description of the Invalid Product Test"
    }

    chai.request(server)
      .post('/api/products')
      .send(product)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      })
  });


  it('should POST a valid product', function(done) {
    let product = {
      name: "Product Test",
      description: "Description of the Product Test",
      price: 100,
      inStock: true
    }

    chai.request(server)
      .post('/api/products')
      .send(product)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      })
  });


  it('it should verify that we have 1 product in DB collection ', function(done) {

    chai.request(server)
      .get('/api/products')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done();
      });
  });

});


//Clean up af tests
after((done) => {
  Product.deleteMany({}, function(err) {
    done();
  });
});