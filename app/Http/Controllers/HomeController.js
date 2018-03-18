'use strict'

const rq = use('request-promise')
const Env = use('Env')

class HomeController {
  constructor () {
    this.req = rq
    this.url = Env.get('MANAGE_URL')
  }

  * index (request, response) {
    yield response.sendView('home.index')
  }
}

module.exports = HomeController
