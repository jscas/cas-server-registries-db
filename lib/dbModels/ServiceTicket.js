'use strict';

const path = require('path');
const Tstamp = require(path.join(__dirname, '_tstamp'));
const tgen = require(path.join(__dirname, '..', 'ticketIdGenerator'));

function ServiceTicket(tgtId, expires) {
  Tstamp.apply(this, arguments);

  this.tid = 'ST-' + tgen();
  this.tgtId = tgtId;
  this.created = new Date();
  this.expires = expires || new Date(Date.now() + 86400 * 1000);
  this.serviceId = null;
}

Tstamp.extend(ServiceTicket);
ServiceTicket.tableName = 'service_tickets';

ServiceTicket.jsonSchema = {
  type: 'object',
  required: ['tid', 'tgtId', 'created', 'expires'],

  properties: {
    id: {type: 'integer'},
    tgtId: {type: 'integer'},
    tid: {type: 'string'},
    created: {type: 'date'},
    expires: {type: 'date'},
    valid: {type: 'boolean'},
    serviceId: {type: 'string'},
    createdAt: {type: 'date'},
    updatedAt: {type: 'date'}
  }
};

ServiceTicket.relationMappings = {
  ticketGrantingTicket: {
    relation: Tstamp.OneToOneRelation,
    modelClass: path.join(__dirname, 'TicketGrantingTicket'),

    join: {
      from: 'service_tickets.tgt_id',
      to: 'ticket_granting_tickets.id'
    }
  }
};

module.exports = ServiceTicket;
