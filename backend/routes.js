var routes = [
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