'use strict'

class ProfileController {
  * index (request, response) {

    yield response.sendView('profile.index')
  }
}

module.exports = ProfileController
