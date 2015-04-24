var Hapi = require('hapi');
var Boom = require('boom');

var server = new Hapi.Server();
server.connection({ port: 3000 });
server.start();

var quotes = [
	'I\'ll be back -- Terminator',
	'Faithless is he that says farewell when the road darkens. -- JRR Tolkien',
	'Not all those who wander are lost. -- JRR Tolkien'
]

server.route({
	method: 'GET',
	path: '/quote/{id}',
	handler: function(req, reply) {
		console.log('Hit on /quote/' + req.params.id);
		
		if (quotes.length <= req.params.id) {
			return reply(Boom.notFound('Unknown quote.'));
		}
		reply(quotes[req.params.id]);
	}
});

server.route({
	method: 'GET',
	path: '/quotes/random',
	handler: function(req, reply) {
		console.log('Hit on /quotes/random');
		reply(quotes[Math.random() * quotes.length | 0]);
	}
});
