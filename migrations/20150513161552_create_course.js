'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('courses', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.string('semester');
    table.integer('year');
    table.integer('isis_id');
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('courses');
};
