var Boom = require('boom');

var handle = function (req, reply) {
    var Quote = req.server.plugins['hapi-mongo-models'].Quote;

    var quote = Quote.findById(req.params.id, function(err, result) {
        if(err || result.length === 0) {
            reply(Boom.notFound('Could not find quote with this id.'));
        }else {
            reply(result);
        }
    });
};

module.exports = {
    handle: handle
};
