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
    },
    {
        method: ['POST'],
        path: '/isis',
        handler: function(req, reply) {
            console.log(req.payload);
            
            reply("Hello world!");
        }
    }
];

module.exports = routes;