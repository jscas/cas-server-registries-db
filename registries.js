'use strict';

const path = require('path');
const ioc = require('laic').laic.addNamespace('registriesDB');
const objection = require('objection');
const Model = objection.Model;

module.exports = function registries(knex) {
  if (!knex) {
    throw new Error('missing Knex instance');
  }

  Model.knex(knex);

  ioc.register('objection', objection, false);
  const models = require(path.join(__dirname, 'lib', 'dbModels'));

  return {
    knex: knex,
    models: models,
    Model: require(path.join(__dirname, 'lib', 'dbModels', '_base'))
  };
};
