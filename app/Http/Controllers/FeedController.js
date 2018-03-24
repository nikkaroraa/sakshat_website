'use strict'

class FeedController {
  * index (request, response) {

    yield response.sendView('feed.index')
  }
}

module.exports = FeedController
