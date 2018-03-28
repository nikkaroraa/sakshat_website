'use strict'

const Database = use('Database')
const User = use('App/Model/User')
const Organisation = use('App/Model/Organisation')
const Helpers = use('Helpers')
const fs = use('fs')
const Env = use('Env')
const moment = use('moment')

class OrganisationController {
  * addOrganisation (request, response) {

    let user = yield User.find(request.currentUser.id)

    user = user.toJSON()

    yield response.sendView('organisation.add', {
      user: user
    })
    return
  }

  * addPostOrganisation (request, response) {

    response.ok('received')
    return
  }
}

module.exports = OrganisationController
