'use strict';

const path = require('path');
const Base = require(path.join(__dirname, '_base'));

function TstampModel() {
  Base.apply(this,  arguments);
  const date = new Date();
  this.createdAt = date;
  this.updatedAt = date;
}

Base.extend(TstampModel);

TstampModel.prototype.$beforeInsert = function beforeInsert() {
  Base.prototype.$beforeInsert.apply(this);
  const date = new Date();
  this.createdAt = date;
  this.updatedAt = date;
};

TstampModel.prototype.$beforeUpdate = function beforeUpdate() {
  Base.prototype.$beforeUpdate.apply(this);
  this.updatedAt = new Date();
};

module.exports = TstampModel;
