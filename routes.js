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
        config: {
            cors: true,
            handler: require('./handlers/signup').handle
        }
    },
    {
        method: 'GET',
        path: '/signup',
        handler: function(res, reply) {
            console.log("AAAAAAAA");
            reply('This is the GET endpoint &rarr; you should never hit this...');
        }
    }
];

module.exports = routes;