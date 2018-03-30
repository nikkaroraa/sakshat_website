'use strict'

const User = use('App/Model/User')
const Organisation = use('App/Model/Organisation')
const OrganisationOwner = use('App/Model/OrganisationOwner')
const Hash = use('Hash')

class RegisterController {
  * register (request, response) {

    const user = new User()
    user.username = request.input('username')
    user.email = request.input('email')
    user.password = request.input('password')

    yield user.save()

    let registered_user = yield User.findBy('username', request.input('username'))
    registered_user = registered_user.toJSON()

    let user_id = registered_user.id

    const setup_organisation = request.input('setup_organisation')
    // response.ok(setup_organisation)
    if(setup_organisation) {
      const organisation = new Organisation()
      organisation.ngodarpan_id = request.input('organisation_ngodarpan_id')
      organisation.name = request.input('organisation_name')
      organisation.description = request.input('organisation_description')
      organisation.email = request.input('organisation_email')
      organisation.contact = request.input('organisation_contact')
      organisation.location = request.input('organisation_location')

      yield organisation.save()

      let registered_org = yield Organisation.findBy('name', request.input('organisation_name'))
      registered_org = registered_org.toJSON()

      let org_id = registered_org.id

      const organisationOwner = new OrganisationOwner()
      organisationOwner.organisation_id = org_id
      organisationOwner.user_id = user.id
      yield organisationOwner.save()
    }

    var registerMessage = {
      success: 'Registration Successful! Now go ahead and login!!'
    }

    yield request
          .with({success: registerMessage.success})
          .flash()
    response.route('home')
  }

}

module.exports = RegisterController
