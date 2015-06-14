'use strict';

exports.up = function(knex) {
    return knex.schema.createTable('courses_supervisors', function(table) {
        table.integer('course_id').notNullable().references('courses.id')
        table.integer('user_id').notNullable().references('users.id')
        table.unique(['course_id', 'user_id']);
    }).createTable('courses_students', function(table) {
        table.integer('course_id').notNullable().references('courses.id')
        table.integer('user_id').notNullable().references('users.id')
        table.unique(['course_id', 'user_id']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('courses_supervisors').dropTable('courses_students');
};
