'use strict'

const Env = use('Env')
const User = use('App/Model/User')
const Hash = use('Hash')

class AuthController {
  * index (request, response) {

    const cookie = request.cookie('access_token')
    const fingerprint = request.cookie('maple_concierge')

    if (cookie == null || fingerprint == null) {
      yield response.sendView('auth.login')
      return
    }

    const token = cookie.replace(fingerprint, '')

    if (token == null) {
      yield response.sendView('auth.login')
      return
    }

    const isLoggedIn = yield request.auth.check()
    if (isLoggedIn) {
      response.route('feed')
      return
    }

    yield response.sendView('auth.login')
    return
  }

  * login (request, response) {
    const email = request.input('email')
    const password = request.input('password')

    const loginMessage = {
      success: 'Logged-in Successfully!',
      error: 'Invalid Credentials'
    }

    // Attempt to login with email and password
    const token = yield request.auth.attempt(email, password)
    if (token) {
      let user = yield User.query().where('email', email).first()
      user = user.toJSON()

      delete user.created_at
      delete user.updated_at

      let access_token = token + request.input('client_secret')
      response.cookie('access_token', access_token, {
        httpOnly: true,
        maxAge: '2592000',
        path: '/'
      })
      response.cookie('sakshat', request.input('client_secret'), {
        httpOnly: true,
        maxAge: '2592000',
        path: '/'
      })

      yield request.session.put('user', user)

      yield request
          .with({success: loginMessage.success})
          .flash()
      response.route('/profile')
      return
    }

    yield request
          .with({error: loginMessage.error})
          .flash()
    response.redirect('back')
  }

  * logout (request, response) {
    response.clearCookie('access_token')
    response.clearCookie('sakshat')
    yield request.session.forget('user')

    yield request.auth.logout()

    return response.redirect('/')
  }
}

module.exports = AuthController
