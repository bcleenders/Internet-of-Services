// Load modules
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

// Test shortcuts
var expect = Code.expect;
var before = lab.before;
var after = lab.after;
var describe = lab.experiment;
var it = lab.test;

var server = require('./server');

describe('Simple server', function () {

    before(function(done) {
        server.start();
        done();
    });

    after(function (done) {
        server.stop();
        done();
    });

    it('should return quotes', function (done) {
        server.inject({
            method: 'GET',
            url: '/quote/1',
            headers: {
                // Optional...
            }
        }, function (res) {
            expect(res.statusCode).to.equal(200);
            
            done();
        });
    });
});
