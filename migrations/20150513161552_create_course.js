'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('courses', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.string('semester');
    table.string('description');
    table.integer('year');
    table.dateTime('enrollment_deadline');
    table.integer('isis_id').unique();
    table.boolean('visible').defaultsTo(false);
    table.timestamps();
    table.json('preferences');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('courses');
};
