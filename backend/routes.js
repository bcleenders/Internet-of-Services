var routes = [
    {
        method: 'GET',
        path: '/quotes/random',
        handler: require('./handlers/getQuoteRandom').handle
    },
    {
        method: 'GET',
        path: '/quote/{id}',
        handler: require('./handlers/getQuote').handle
    }
];

module.exports = routes;