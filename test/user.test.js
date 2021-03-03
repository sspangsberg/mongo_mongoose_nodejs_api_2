//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//let mongoose = require("mongoose");
let User = require('../models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
//let should = chai.should();

chai.use(chaiHttp);

/*
 * Test the /GET route
 */
describe('/User tests', function () {

  // Empty database before tests
  before(function (done) { //Before each test we empty the database  
    User.deleteMany({}, function (err) {
      done();
    }
  )});

  //Clean up
  after(function (done) {
    User.deleteMany({}, function (err) {
      done();
    }
  )});

  it('should register a user', function (done) {
    let user = {
      name: "localuser",
      email: "mail@local.com",
      password: "123456"
    }

    chai.request(server)
      .post('/api/user/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('error');
        done();
      })
  });  
});