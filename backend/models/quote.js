var Joi = require('joi');
var ObjectAssign = require('object-assign');
var BaseModel = require('hapi-mongo-models').BaseModel;

var Quote = BaseModel.extend({
	// instance prototype
	constructor: function (attrs) {

		ObjectAssign(this, attrs);
	}
});

Quote._collection = 'quote'; // the mongo collection name

Quote.schema = Joi.object().keys({
	text: Joi.string().required()
});

Quote.staticFunction = function () {
	// static class function
};

module.exports = Quote;