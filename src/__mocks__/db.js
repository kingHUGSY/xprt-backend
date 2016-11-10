<<<<<<< HEAD
/* eslint-disable import/no-extraneous-dependencies */

import knex from 'knex';
import mockKnex from 'mock-knex';

const db = knex({
  client: 'pg',
=======
import knex from 'knex';
import mockKnex from 'mock-knex';

let db = knex({
  client: 'pg'
>>>>>>> 0e1b8d6... Initial commit
});

mockKnex.mock(db);

module.exports = db;
