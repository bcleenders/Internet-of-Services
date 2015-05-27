'use strict';

exports.up = function(knex) {
    return knex.schema.createTable('course_user', function(table) {
        table.integer('course_id').unique().references('id');
        table.integer('user_id').unique().references('id');
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('course_users');
};
