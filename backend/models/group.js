var Joi = require('joi');
var ObjectAssign = require('object-assign');
var BaseModel = require('hapi-mongo-models').BaseModel;

var Quote = BaseModel.extend({
    // instance prototype
    constructor: function (attrs) {

        ObjectAssign(this, attrs);
    }
});

Quote._collection = 'group'; // the mongo collection name

Quote.schema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    owner: Joi().string().required(),
    members: Joi.array().items(Joi.string())
});

Quote.staticFunction = function () {
    // static class function
};

module.exports = Quote;