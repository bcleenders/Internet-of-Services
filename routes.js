var routes = [
    {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.view('index', { title: 'groupBy' });
        }
    },
    {
        method: 'POST',
        path: '/signup',
        handler: require('./handlers/signup').handle
    }
];

module.exports = routes;