'use strict'

const Lucid = use('Lucid')

class OrganisationProject extends Lucid {
  static get table () {
    return 'organisation_projects'
  }

  organisation () {
    return this.belongsTo('App/Model/Organisation')
  }

  project () {
    return this.belongsTo('App/Model/Project')
  }
}

module.exports = OrganisationProject
