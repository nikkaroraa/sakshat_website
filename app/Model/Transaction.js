'use strict'

const Lucid = use('Lucid')

class Transaction extends Lucid {
  static get table () {
    return 'transactions'
  }

  project () {
    return this.belongsTo('App/Model/Project')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Transaction
