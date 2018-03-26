'use strict'

const Lucid = use('Lucid')

class Post extends Lucid {
  static get table () {
    return 'posts'
  }

  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Post
