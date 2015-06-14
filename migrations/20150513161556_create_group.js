'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('groups', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.integer('course_id').notNullable().references('courses.id');
    table.string('description');
    table.integer('minsize').defaultTo(0);
    table.integer('maxsize').defaultTo(0);
    table.boolean('waitingList').notNullable().defaultTo(false);
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('groups');
};
