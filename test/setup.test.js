//During the test the env variable is set to test (change to test database...)
process.env.NODE_ENV = 'test';

let Product = require('../models/product');
let User = require('../models/user');    

before(function(done) {  
    User.deleteMany({}, function (err) {});
    Product.deleteMany({}, function (err) {} );
    done();
});

after(function(done) {  
    User.deleteMany({}, function (err) {});
    Product.deleteMany({}, function (err) {});
    done();
});