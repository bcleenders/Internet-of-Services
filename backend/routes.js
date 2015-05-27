var routes = [
    {
        method: 'GET',
        path: '/user/{id}',
        handler: require('./handlers/getUser').handle
    },
    {
        method: 'POST',
        path: '/user',
        handler: require('./handlers/postUser').handle
    }
];

module.exports = routes;