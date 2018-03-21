'use strict'

const Lucid = use('Lucid')

class Volunteer extends Lucid {
  static get table () {
    return 'volunteers'
  }

  project () {
    return this.belongsTo('App/Model/Project')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Volunteer
