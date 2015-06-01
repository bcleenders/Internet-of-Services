'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('groups', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.boolean('waitingList').notNullable().defaultTo(false);
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('groups');
};
