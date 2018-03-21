'use strict'

const Lucid = use('Lucid')

class Rating extends Lucid {
  static get table () {
    return 'ratings'
  }

  project () {
    return this.belongsTo('App/Model/Project')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Rating
