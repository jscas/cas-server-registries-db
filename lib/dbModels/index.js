'use strict';

const fs = require('fs');
const path = require('path');

function _require(name) {
  // We use `__dirname + '/model'` to avoid require loops when defining
  // many-to-many relationships.
  return require(path.join(__dirname, name));
}

const models = {};

const nope = [ 'index.js', '_base.js', '_tstamp.js' ];
for (let f of fs.readdirSync(__dirname)) {
  if (nope.indexOf(f) !== -1) {
    continue;
  }

  models[path.basename(f, '.js')] = _require(f);
}

module.exports = models;
