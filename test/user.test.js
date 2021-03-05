//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

/*
 * Test the /GET route
 */
describe('/User tests', function () {

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