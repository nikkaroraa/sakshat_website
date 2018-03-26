'use strict'

const Database = use('Database')
const User = use('App/Model/User')
const Post = use('App/Model/Post')
const PostComment = use('App/Model/PostComment')
const Helpers = use('Helpers')
const fs = use('fs')
const Env = use('Env')
const moment = use('moment')

class FeedController {
  * index (request, response) {

    let user = yield User.find(request.currentUser.id)

    let posts = yield Post.query().with('user').fetch()
    posts = posts.toJSON()

    for (let i = 0; i < posts.length; i++) {

      posts[i].creation_date = moment(posts[i].created_at).format('DD MMM, YYYY')
      posts[i].creation_time = moment(posts[i].created_at).format('hh:mm A')

      let post_comments = yield PostComment.query().where('post_id', posts[i].id).with('user').fetch()
      post_comments = post_comments.toJSON()
      for (let j = 0; j < post_comments.length; j++) {
        post_comments[j].creation_date = moment(post_comments[j].created_at).format('DD MMM, YYYY')
        post_comments[j].creation_time = moment(post_comments[j].created_at).format('hh:mm A')
      }

      posts[i].comments = post_comments
      posts[i].comment_count = post_comments.length
    }

    user = user.toJSON()

    // response.ok(posts)
    yield response.sendView('feed.index', {
      user: user,
      posts: posts
    })
    return
  }
}

module.exports = FeedController
