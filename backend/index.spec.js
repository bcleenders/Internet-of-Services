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

    before(function (done) {
        server.start();

        // Give it a bit of time really register...
        setTimeout(function() {
            done();
        }, 100);
    });

    after(function (done) {
        server.stop();
        done();
    });

    it('Should return a 404 for non-existing queries', function (done) {
        server.inject({
            method: 'GET',
            url: '/quote/1',
            headers: {
                // Optional...
            }
        }, function (res) {
            expect(res.statusCode).to.equal(404);

            done();
        });
    });
});
