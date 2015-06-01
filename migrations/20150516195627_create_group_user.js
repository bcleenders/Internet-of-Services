'use strict';

exports.up = function(knex) {
    return knex.schema.createTable('group_user', function(table) {
        table.integer('group_id').notNullable().references('id').inTable("groups");
        table.integer('user_id').notNullable().references('id').inTable("users");
        table.unique(['group_id', 'user_id']);
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('group_users');
};
