'use strict'
const Database = use('Database')

class PostsController {
  * index (request, response) {
      const john = yield Database
        .table('projects')
        .limit(1)

      /** rendering view */
     const dalip = {
       name : "dalip"
     } 
     //response.json(john);
     yield response.sendView('project-ashwin.posts', {john})
    }
}

module.exports = PostsController
