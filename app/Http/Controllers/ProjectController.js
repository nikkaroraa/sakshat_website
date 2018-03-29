'use strict'

const Database = use('Database')
const User = use('App/Model/User')
const Project = use('App/Model/Project')
const Organisation = use('App/Model/Organisation')
const Volunteer = use('App/Model/Volunteer')
const Donator = use('App/Model/Donator')
const OrganisationOwner = use('App/Model/OrganisationOwner')
const ProjectOwner = use('App/Model/ProjectOwner')
const Helpers = use('Helpers')
const fs = use('fs')
const Env = use('Env')

class ProfileController {
  * index (request,response) {
    let user = yield User.find(request.currentUser.id)

    user = user.toJSON()

    let allOrganisations = yield Organisation.query().with('organisation').orderBy('created_at', 'desc').fetch()
    response.ok(allOrganisations)


    return
  }

  * addProject (request, response) {

    let user = yield User.find(request.currentUser.id)

    user = user.toJSON()

    let allOrganisationsData = yield OrganisationOwner.query().where('user_id', user.id).with('organisation').orderBy('created_at', 'desc').fetch()
    allOrganisationsData = allOrganisationsData.toJSON()
    let organisations = []
    for (let i = 0; i < allOrganisationsData.length; i++) {
      organisations.push(allOrganisationsData[i].organisation)
    }

    let independentOrganisation = yield Organisation.findBy('name', 'Independent')
    independentOrganisation = independentOrganisation.toJSON()

    organisations.splice(0, 0, independentOrganisation)
    // response.ok(organisations)

    yield response.sendView('project.add',{
      organisations: organisations
    })
    return
  }

  * viewProject(request,response) {

    const id = request.param('id')
    let data = yield ProjectOwner.query().where('project_id', id).with('user','project').fetch()
    let volunteers = yield Volunteer.query().where('project_id', id).with('user','project').fetch()
    let donators=yield Donator.query().where('project_id',id).with('user','project').fetch()
    data = data.toJSON()
    volunteers=volunteers.toJSON();
    donators=donators.toJSON();


    var info = {
      author: data[0].user.username,
      project_name: data[0].project.name,
      tag_line: data[0].project.tag_line,
      tag: data[0].project.tag,
      project_description: data[0].project.description,
      volunteers: volunteers,
      donators: donators
    };
    //response.ok(info);
    //let author= yield User.find()
    yield response.sendView('project.index',{
      info: info
    })
    return
  }
}

module.exports = ProfileController
