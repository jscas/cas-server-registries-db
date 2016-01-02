'use strict';

const ioc = require('laic').laic.registriesDB;
const Model = ioc.get('objection').Model;
const camelCase = require('camel-case');
const snakeCase = require('snake-case');

function Base() {
  Model.apply(this, arguments);
}

Model.extend(Base);

Base.prototype.$afterInsert = function afterInsert() {
  this.isDirty.dirty = false;
};

Base.prototype.$afterUpdate = function afterUpdate() {
  this.isDirty.dirty = false;
};

Base.prototype.$beforeInsert = function beforeInsert() {
};

Base.prototype.$beforeUpdate = function beforeUpdate() {
  if (!this.isDirty()) {
    throw Error('Not updating since instance not marked dirty');
  }
};

// Convert camel cased object properties to snake cased column names
Base.prototype.$formatDatabaseJson = function objToDb(json) {
  json = Model.prototype.$formatDatabaseJson.call(this, json);

  const dbObj = {};
  for (let key of Object.keys(json)) {
    dbObj[snakeCase(key)] = json[key];
  }

  return dbObj;
};

// Convert snake cased column names to camel cased object properties
Base.prototype.$parseDatabaseJson = function dbToObj(json) {
  const obj = {};
  for (let key of Object.keys(json)) {
    obj[camelCase(key)] = json[key];
  }

  return Model.prototype.$parseDatabaseJson.call(this, obj);
};

Base.prototype.isDirty = function() {
  return this.isDirty.dirty;
};

Base.prototype.isDirty.dirty = false;

Base.prototype.markDirty = function () {
  this.isDirty.dirty = true;
};

module.exports = Base;
