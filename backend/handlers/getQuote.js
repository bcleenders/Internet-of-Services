var Boom = require('boom');
var Quote = require('../models/quote');

var handle = function (req, reply) {
    var quote = Quote.get(req.params.id);

    if (quote) {
        reply(quote);
    } else {
        reply(Boom.notFound('Unknown quote.'));
    }
};

module.exports = {
    handle: handle
};
