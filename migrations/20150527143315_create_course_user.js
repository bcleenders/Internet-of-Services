'use strict';

exports.up = function(knex) {
    return knex.schema.createTable('course_user', function(table) {
        table.integer('course_id').notNullable().references('id').inTable("courses");
        table.integer('user_id').notNullable().references('id').inTable("users");
        table.unique(['course_id', 'user_id']);
        table.boolean('teacher').notNullable().defaultTo(false);
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('course_users');
};
