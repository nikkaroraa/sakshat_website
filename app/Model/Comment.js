'use strict'

const Lucid = use('Lucid')

class Comment extends Lucid {
  static get table () {
    return 'comments'
  }

  project () {
    return this.belongsTo('App/Model/Project')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Comment
