'use strict'

const Lucid = use('Lucid')

class OrganisationDoc extends Lucid {
  static get table () {
    return 'organisation_docs'
  }

  organisation () {
    return this.belongsTo('App/Model/Organisation')
  }
}

module.exports = OrganisationDoc
