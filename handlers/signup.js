var Boom = require('boom');

var handle = function (req, reply) {
    console.log('Hit signup endpoint!');
    console.log(req.payload);

    reply('Hello, world!');
};

module.exports = {
    handle: handle
};