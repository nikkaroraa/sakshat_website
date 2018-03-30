'use strict'

const Lucid = use('Lucid')

class ProjectPaymentAccount extends Lucid {
  static get table () {
    return 'project_payment_accounts'
  }

  project () {
    return this.belongsTo('App/Model/Project')
  }
}

module.exports = ProjectPaymentAccount
