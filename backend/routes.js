var routes = [
    {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.view('index', { title: 'groupBy' });
        }
    },
    {
        method: 'GET',
        path: '/quote/{id}',
        handler: require('./handlers/getQuote').handle
    },
    {
        method: 'POST',
        path: '/quote',
        handler: require('./handlers/postQuote').handle
    }
];

module.exports = routes;