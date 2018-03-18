'use strict'

const Lucid = use('Lucid')

class OrganisationUser extends Lucid {
  static get table () {
    return 'organisation_users'
  }

  organisation () {
    return this.belongsTo('App/Model/Organisation')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = OrganisationUser
