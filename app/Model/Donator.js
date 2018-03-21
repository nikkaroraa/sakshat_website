'use strict'

const Lucid = use('Lucid')

class Donator extends Lucid {
  static get table () {
    return 'donators'
  }

  project () {
    return this.belongsTo('App/Model/Project')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Donator
