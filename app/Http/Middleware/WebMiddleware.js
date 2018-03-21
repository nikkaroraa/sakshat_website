'use strict'

class WebMiddleware {

  * handle (request, response, next) {
    const cookie = request.cookie('access_token')
    const fingerprint = request.cookie('sakshat')

    console.log(cookie, fingerprint)
    if (cookie == null || fingerprint == null ) {
      response.route('logout')
      return
    }

    const token = cookie.replace(fingerprint, '')

    if (token == null) {
      response.route('login')
      return
    }

    yield next
    return

    response.route('login')
    return
  }

}

module.exports = WebMiddleware
