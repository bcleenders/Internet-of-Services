'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.string('email').unique().notNullable();
    table.integer('isis_id').unique();
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
