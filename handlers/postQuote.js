var Boom = require('boom');

var handle = function (req, reply) {
    var Quote = req.server.plugins['hapi-mongo-models'].Quote;

    // Get the parameter (POST parameter text)
    var queryText = req.payload.text;

    Quote.insertOne({text: queryText}, function (err, results) {
        if(err) {
            reply(Boom.badImplementation('Could not insert quote :-('));
        } else {
            reply(results);
        }
    });
};

module.exports = {
    handle: handle
};
