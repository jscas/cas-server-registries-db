'use strict';

const path = require('path');
const Tstamp = require(path.join(__dirname, '_tstamp'));
const tgen = require(path.join(__dirname, '..', 'ticketIdGenerator'));

function TicketGrantingTicket(userId, expires) {
  Tstamp.apply(this, arguments);

  this.tid = 'TGT-' + tgen();
  this.created = new Date();
  this.expires = expires || new Date(Date.now() + 86400 * 1000);
  this.userId = userId;
}

Tstamp.extend(TicketGrantingTicket);
TicketGrantingTicket.tableName = 'ticket_granting_tickets';

TicketGrantingTicket.jsonSchema = {
  type: 'object',
  required: ['tid', 'created', 'expires', 'userId'],

  properties: {
    id: {type: 'integer'},
    tid: {type: 'string'},
    created: {type: 'date'},
    expires: {type: 'date'},
    userId: {type: 'string'},
    valid: {type: 'boolean'},
    extra: {type: 'array'},
    createdAt: {type: 'date'},
    updatedAt: {type: 'date'}
  }
};

TicketGrantingTicket.relationMappings = {
  loginTicket: {
    relation: Tstamp.OneToOneRelation,
    modelClass: path.join(__dirname, 'LoginTicket'),

    join: {
      from: 'ticket_granting_tickets.lt_id',
      to: 'login_tickets.id'
    }
  }
};

module.exports = TicketGrantingTicket;
