<<<<<<< HEAD
exports.up = knex => (
  knex.schema
    .createTableIfNotExists('users', (table) => {
      table.increments('id').primary();
      table.enum('scope', ['admin', 'user']).notNullable();
      table.text('email').notNullable().unique();
      table.text('password').notNullable();
      table.text('description');
      table.binary('image');
    })
);

exports.down = knex => (
  knex.schema
    .dropTableIfExists('users')
);
=======
/*eslint-disable func-names*/
'use strict';

exports.up = function(knex) {
  return knex.schema
    .createTableIfNotExists('teachers', function(table) {
      table.increments('id').primary();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.text('photograph').notNullable();
      table.text('name').notNullable();
      table.text('title').notNullable();
      table.text('school').notNullable();
      table.text('address').notNullable();
      table.text('description').notNullable();
      table.text('email').notNullable().unique();
      table.text('password').notNullable();
      table.text('phone').notNullable();
    })
    .createTableIfNotExists('experts', function(table) {
      table.increments('id').primary();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.text('photograph').notNullable();
      table.text('name').notNullable();
      table.text('title').notNullable();
      table.text('description').notNullable();
      table.json('subjects').notNullable();
      table.text('area').notNullable();
      table.text('email').notNullable().unique();
      table.text('password').notNullable();
      table.text('phone');
    })
    .createTableIfNotExists('admins', function(table) {
      table.increments('id').primary();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.text('username').notNullable().unique();
      table.text('password').notNullable();
      table.text('email').notNullable().unique();
    })
    .createTableIfNotExists('lectures', function(table) {
      table.increments('id').primary();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.text('title').notNullable().unique();
      table.text('description').notNullable();
      table.text('dates').notNullable();
      table.text('teacherNote').notNullable();
      table.text('expertNote').notNullable();
      table.text('targetStudents').notNullable();
      table.text('creatorId').notNullable();
      table.text('creatorType').notNullable();
      table.text('area').notNullable();
    })
    .createTableIfNotExists('feedback', function(table) {
      table.increments('id').primary();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.text('text').notNullable();
      table.text('creatorType').notNullable();
      table.text('email').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('teachers')
    .dropTableIfExists('experts')
    .dropTableIfExists('admins')
    .dropTableIfExists('lectures')
    .dropTableIfExists('feedback');
};
>>>>>>> 0e1b8d6... Initial commit
