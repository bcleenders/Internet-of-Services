var Boom = require('boom');
var Promise = require('bluebird');
var _ = require('lodash');

var handle = function (req, reply) {
    // TODO: verify signature!

    var models = req.server.plugins.models;

    var courseData = {
        isis_id: req.payload.context_id,
        name: req.payload.context_title,
        year: 2000,
        semester: 'SS'
    };

    var userData = {
        name: req.payload.lis_person_name_full,
        email: req.payload.lis_person_contact_email_primary
    };

    var upsert = function(model, data) {
        model.fetch()
    };

    var knex = models._bookshelf.knex;

    knex.transaction(function(trx) {
        Promise.all([
            // Insert the user, get his ID
            knex('users').transacting(trx).returning('id').insert(userData),
            // Insert the course, get its ID
            knex('courses').transacting(trx).returning('id').insert(courseData)
        ]).then(
            // When both inserts are done, insert the junction
            function(results) {
                return knex('course_user').transacting(trx).insert({
                    user_id: results[0][0],
                    course_id: results[1][0],
                    teacher: (req.payload.roles === 'Instructor')
                })
                .then(trx.commit)
                .catch(trx.rollback);
            }
        ).catch(function(err) {
            trx.rollback();
            console.log(err);
        });
    }).then(function(resp) {
        // Send a reply
        reply('Hello, world!');
    }).catch(function(err) {
        console.log('Caught error:');
        console.error(err);

        reply('An error occurred (did you clear the database? you should...)');
    });
};

module.exports = {
    handle: handle
};