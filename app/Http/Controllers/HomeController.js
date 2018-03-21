'use strict'

const Env = use('Env')

class HomeController {
  * index (request, response) {
    yield response.sendView('home.index')
  }
}

module.exports = HomeController
