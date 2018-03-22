'use strict'
const Database = use('Database')

class PostsController {
  * index (request, response) {
    const john = yield Database
      .table('projects')
      .limit(1)

    response.json(john)
  }
}

module.exports = PostsController
