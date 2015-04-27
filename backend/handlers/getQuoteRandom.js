var Quote = require('../models/quote');

var handle = function (req, reply) {
    console.log('Hit on /quotes/random');
    reply(Quote.get(Math.random() * Quote.count | 0));
};

module.exports = {
    handle: handle
};
