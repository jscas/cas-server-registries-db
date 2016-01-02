'use strict';

const path = require('path');
const Tstamp = require(path.join(__dirname, '_tstamp'));
const tgen = require(path.join(__dirname, '..', 'ticketIdGenerator'));

function LoginTicket(expires) {
  Tstamp.apply(this, arguments);

  this.tid = 'LT-' + tgen();
  this.created = new Date();
  this.expires = expires || new Date(Date.now() + 86400 * 1000);
}

Tstamp.extend(LoginTicket);
LoginTicket.tableName = 'login_tickets';

LoginTicket.jsonSchema = {
  type: 'object',
  required: ['tid', 'created', 'expires'],

  properties: {
    id: {type: 'integer'},
    tid: {type: 'string'},
    created: {type: 'date'},
    expires: {type: 'date'},
    valid: {type: 'boolean'},
    createdAt: {type: 'date'},
    updatedAt: {type: 'date'}
  }
};

LoginTicket.relationMappings = {
  user: {
    relation: Tstamp.OneToOneRelation,
    modelClass: path.join(__dirname, 'UserId'),

    join: {
      from: 'login_tickets.user_id',
      to: 'user_ids.id'
    }
  }
};

module.exports = LoginTicket;
