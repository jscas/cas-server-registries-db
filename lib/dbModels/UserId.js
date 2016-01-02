'use strict';

const path = require('path');
const Tstamp = require(path.join(__dirname, '_tstamp'));

function UserId(userId) {
  Tstamp.apply(this, arguments);
  this.uid = userId;
}

UserId.tableName = 'user_ids';
Tstamp.extend(UserId);

UserId.jsonSchema = {
  type: 'object',
  required: ['uid'],

  properties: {
    id: {type: 'integer'},
    uid: {type: 'string'},
    createdAt: {type: 'date'},
    updatedAt: {type: 'date'}
  }
};

module.exports = UserId;
