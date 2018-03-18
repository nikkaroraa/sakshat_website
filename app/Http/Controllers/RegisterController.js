'use strict'

const User = use('App/Model/User')
const Hash = use('Hash')

class RegisterController {
  * register (request, response) {

    const user = new User()
    user.username = request.input('username')
    user.email = request.input('email')
    user.password = request.input('password')

    yield user.save()

    var registerMessage = {
      success: 'Registration Successful! Now go ahead and login'
    }


    yield response.route('home')
  }

}

module.exports = RegisterController
