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
        method: 'GET',
        path: '/course/{course_id}/edit',
        handler: require('./handlers/courses/edit').handle
    },
    {
        method: 'POST',
        path: '/course/{course_id}',
        handler: require('./handlers/courses/update').handle
    },
    {
        method: 'POST',
        path: '/course/{course_id}/enroll',
        handler: require('./handlers/updateEnrollment').handle
    },
    {
        method: '*',
        path: '/{p*}', // catch-all path
        handler: function (request, reply) {
            reply.view('404', {message: 'unknown route: path or method do not match known paths/actions.'}).code(404);
        }
    }
];

module.exports = routes;
