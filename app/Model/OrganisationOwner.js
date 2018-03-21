'use strict'

const Lucid = use('Lucid')

class OrganisationOwner extends Lucid {
  static get table () {
    return 'organisation_owners'
  }

  organisation () {
    return this.belongsTo('App/Model/Organisation')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = OrganisationOwner
