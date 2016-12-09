import knex from 'db';
import Boom from 'boom';

const list = {
  handler: (request, reply) => {
    knex('experts')
    .then(reply)
    .catch(err => {
      reply(Boom.badImplementation('Database error', err));
    });
  }
};

const get = {
  handler: (request, reply) => {
    knex('experts')
    .first()
    .where('id', request.params.expertId)
    .then(reply)
    .catch(err => {
      reply(Boom.badImplementation('Database error', err));
    });
  }
};

const register = {
  handler: (request, reply) => {
    // TODO: hash password, DO NOT return it
    // this is NOT done, just a quick and dirty register method
    request.payload.photograph = 'http://lorempixel.com/640/480/?' + Math.round(Math.random() * 1000000);
    request.payload.subjects = JSON.stringify(request.payload.subjects.split(' '));
    console.log(request.payload);

    knex('experts')
    .insert(request.payload)
    .returning('*')
    .then(reply)
    .catch(function(err) {
      reply(Boom.badImplementation('Database error', err));
    });
  }
};

const update = {
  handler: (request, reply) => {
    knex('experts')
    .where('id', request.params.expertId)
    .update(request.payload)
    .returning('*')
    .then(reply)
    .catch(function(err) {
      reply(Boom.badImplementation('Database error', err));
    });
  }
};

const del = {
  handler: (request, reply) => {
    knex('experts')
    .where('id', request.params.expertId)
    .del()
    .returning('*')
    .then(reply)
    .catch(err => {
      reply(Boom.badImplementation('Database error', err));
    });
  }
};

export default [
  {
    method: 'GET',
    path: '/experts',
    config: list
  }, {
    method: 'GET',
    path: '/experts/{expertId}',
    config: get
  }, {
    method: 'POST',
    path: '/experts',
    config: register
  }, {
    method: 'PUT',
    path: '/experts/{expertId}',
    config: update
  }, {
    method: 'DELETE',
    path: '/experts/{expertId}',
    config: del
  }
];
