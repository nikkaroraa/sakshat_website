'use strict'

const Lucid = use('Lucid')

class PostComment extends Lucid {
  static get table () {
    return 'post_comments'
  }

  post () {
    return this.belongsTo('App/Model/Post')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = PostComment
