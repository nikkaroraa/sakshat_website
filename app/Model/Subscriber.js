'use strict'

const Lucid = use('Lucid')

class Subscriber extends Lucid {
  static get table () {
    return 'subscribers'
  }

  project () {
    return this.belongsTo('App/Model/Project')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Subscriber
