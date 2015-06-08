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
            auth: false,
            handler: require('./handlers/signup').handle
        }
    },
    {
        method: 'POST',
        path: '/course/{course_id}',
        handler: require('./handlers/updateCourse').handle
    }
];

module.exports = routes;