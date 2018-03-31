'use strict'

const Database = use('Database')
const User = use('App/Model/User')

class CollaborationController {

  * index (request, response) {
    let user = yield User.find(request.currentUser.id)
    user = user.toJSON()

    yield response.sendView('collaboration.index', {
      user: user
    })
    return
  }
}

module.exports = CollaborationController
