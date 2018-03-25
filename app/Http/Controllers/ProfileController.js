'use strict'

const Database = use('Database')
const User = use('App/Model/User')
const OrganisationOwner = use('App/Model/OrganisationOwner')
const ProjectOwner = use('App/Model/ProjectOwner')

class ProfileController {
  * index (request, response) {
    let user = yield User.find(request.currentUser.id)

    let organisations = yield OrganisationOwner.query().where('user_id', user.id).with('organisation').fetch()
    let projects = yield ProjectOwner.query().where('user_id', user.id).with('project').fetch()

    organisations = organisations.toJSON()
    let allOrganisations = []
    for (let i = 0; i < organisations.length; i++) {
      allOrganisations.push(organisations[i].organisation)
    }

    projects = projects.toJSON()
    let allProjects = []
    for (let i = 0; i < projects.length; i++) {
      allProjects.push(projects[i].project)
    }

    user = user.toJSON()


    let interests = user.interests
    let allInterests = interests.split(",")

    yield response.sendView('profile.index', {
      user: user,
      organisations: allOrganisations,
      projects: allProjects,
      interests: allInterests
    })
    return
  }

  * editAbout (request, response) {
    const user = yield User.find(request.currentUser.id)

    let name = request.input('name')
    let about = request.input('about')
    let skills = request.input('skills')
    let languages = request.input('languages')

    const affectedRows = yield Database
      .table('users')
      .where('id', user.id)
      .update({ name: name, about: about, skills: skills, languages: languages })

    response.redirect('back')
    return
  }
}

module.exports = ProfileController
