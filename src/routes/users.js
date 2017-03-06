import { merge } from 'lodash';
import Joi from 'joi';

import request from 'request-promise';

import config from '../utils/config';

import { getAuthWithScope, doAuth } from '../utils/auth';
import {
  getUsers,
  getUser,
  updateUser,
  delUser,
  authUser,
  registerUser,
} from '../controllers/users';

const validateUserId = {
  validate: {
    params: {
      userId: Joi.number().integer().required(),
    },
  },
};

const validateRegistrationFields = {
  validate: {
    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  },
};

const users = [
  // Get a list of all users
  {
    method: 'GET',
    path: '/users',
    config: getAuthWithScope('admin'),
    handler: getUsers,
  },

  // Get info about a specific user
  {
    method: 'GET',
    path: '/users/{userId}',
    config: merge({}, validateUserId, getAuthWithScope('user')),
    handler: getUser,
  },

  // Update user profile
  {
    method: 'POST',
    path: '/users/{userId}',
    config: merge({}, validateUserId, getAuthWithScope('user')),
    handler: updateUser,
  },

  // Delete a user, admin only
  {
    method: 'DELETE',
    path: '/users/{userId}',
    config: merge({}, validateUserId, getAuthWithScope('admin')),
    handler: delUser,
  },

  // Authenticate as user
  {
    method: 'POST',
    path: '/users/authenticate',
    config: doAuth,
    handler: authUser,
  },

  // Register new user
  {
    method: 'POST',
    path: '/users',
    config: validateRegistrationFields,
    handler: registerUser,
  },

  // Register/authenticate via OAuth2
  {
    method: ['GET', 'POST'],
    path: '/oauth2/callback',
    config: {
      auth: 'hundred',
    },
    handler: async (req, reply) => {
      if (!req.auth.isAuthenticated) {
        return reply(`Authentication failed due to: ${req.auth.error.message}`);
      }

      const token = req.auth.credentials.token;

      const user = await request({
        uri: config.oauth2.userEndpoint,
        qs: { access_token: token },
      });

      console.log('user info:', user);

      return reply(`<pre>${JSON.stringify(user, null, 4)}</pre>`);
    },
  },
];

export default users;

// Here we register the routes
export const routes = server => server.route(users);
