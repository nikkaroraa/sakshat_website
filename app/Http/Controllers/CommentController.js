'use strict'

const Database = use('Database')
const User = use('App/Model/User')
const PostComment = use('App/Model/PostComment')

class CommentController {

  * addPostComments (request, response) {
      const user = yield User.find(request.currentUser.id)

      // const data = request.all()
      let comment = request.input('comment')
      let post_id = request.input('post_id')
      let user_id = request.input('user_id')

      const trx = yield Database.beginTransaction()

      const postComment = yield PostComment.create({
        post_id: post_id,
        user_id: user_id,
        comment: comment
      })

      trx.commit()

      response.redirect('back')
      return
  }
}

module.exports = CommentController
