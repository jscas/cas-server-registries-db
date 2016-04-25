'use strict';

const path = require('path');
const Tstamp = require(path.join(__dirname, '_tstamp'));

function Service(name, url, comment) {
  Tstamp.apply(this, arguments);

  this.name = name;
  this.url = url;
  this.comment = comment;
  this.extra = null;
}

Tstamp.extend(Service);
Service.tableName = 'services';

Service.jsonSchema = {
  type: 'object',
  required: ['name', 'url'],

  properties: {
    id: {type: 'integer'},
    name: {type: 'string'},
    url: {type: 'string'},
    comment: {type: 'string'},
    extra: {type: 'object'},
    slo: {type: 'boolean'},
    sloType: {type: 'integer'},
    sloUrl: {type: 'string'},
    createdAt: {type: 'date'},
    updatedAt: {type: 'date'}
  }
};

module.exports = Service;
