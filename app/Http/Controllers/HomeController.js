'use strict'

const Env = use('Env')

class HomeController {
  * index (request, response) {
      const cookie = request.cookie('access_token')
      const fingerprint = request.cookie('sakshat')

      if (cookie == null || fingerprint == null) {
        yield response.sendView('home.index')
        return
      }

      const token = cookie.replace(fingerprint, '')

      if (token == null) {
        yield response.sendView('auth.login')
        return
      }

      const isLoggedIn = yield request.auth.check()

      if (isLoggedIn) {
        response.route('profile')
        return
      }

      yield response.sendView('home.index')
      return
    }
}

module.exports = HomeController
