'use strict'

class Helper {
  * handle (request, response, next) {
    if (yield request.session.get('user')) {
      yield this.userDetail(request, response)
    }

    yield next
  }

  * userDetail (request, response) {
    let user = yield request.session.get('user')

    response.viewInstance.global('userDetail', (key) => {
      if (typeof key !== 'undefined' && user[key] !== undefined) {
        return user[key]
      }
      return false
    })
  }
}

module.exports = Helper
