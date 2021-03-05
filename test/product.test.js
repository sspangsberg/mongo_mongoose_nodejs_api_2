//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

/*
 * Test the /GET route
 */
describe('/Product CRUD operations', function () {

  it('should GET all the products', function (done) {
    chai.request(server)
      .get('/api/products')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it('should POST an invalid product', function (done) {
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

  it('should POST a valid product', function (done) {
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
        res.should.have.status(201);
        done();
      })
  });

  it('should verify that we have 1 product in DB collection ', function (done) {
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

