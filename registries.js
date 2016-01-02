'use strict';

const path = require('path');
const ioc = require('laic').laic.addNamespace('registriesDB');
const Knex = require('knex');
const objection = require('objection');
const Model = objection.Model;

module.exports = function registries(knexConfig) {
  if (!knexConfig) {
    throw new Error('missing Knex configuration');
  }

  const knex = new Knex(knexConfig);
  Model.knex(knex);

  ioc.register('objection', objection, false);
  const models = require(path.join(__dirname, 'lib', 'dbModels'));

  return {
    knex: knex,
    models: models,
    Model: require(path.join(__dirname, 'lib', 'dbModels', '_base'))
  };
};
