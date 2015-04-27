var quotes = [
    'Faithless is he that says farewell when the road darkens. -- JRR Tolkien',
    'I\'ll be back -- Terminator',
    'Not all those who wander are lost. -- JRR Tolkien'
];

var get = function (id) {
    if (0 <= id && id <= quotes.length) {
        return quotes[id];
    }
};

var count = function () {
    return quotes.length;
};

module.exports = {
    get: get,
    count: count
};
