'use strict'

const Database = use('Database')
const User = use('App/Model/User')
const Project = use('App/Model/Project')
const ProjectOwner = use('App/Model/ProjectOwner')
const OrganisationProject = use('App/Model/OrganisationProject')
const ProjectDoc = use('App/Model/ProjectDoc')

const Organisation = use('App/Model/Organisation')
const Volunteer = use('App/Model/Volunteer')
const Donator = use('App/Model/Donator')
const OrganisationOwner = use('App/Model/OrganisationOwner')
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

    yield response.sendView('project.add', {
      user: user,
      organisations: organisations
    })
    return
  }

  * addPostProject (request, response) {

    // user_id
    // organisation_id

    // project_name
    // project_description
    // project_purpose
    // project_tagline
    // project_image

    // need_volunteers
    // volunteers_number
    // need_fund
    // fund_amount
    // timebound_bool
    // project_deadline

    let user = yield User.find(request.currentUser.id)

    user = user.toJSON()

    // Get all the input data
    let user_id = request.input('user_id')
    let organisation_id = request.input('organisation_id')

    const project = new Project()
    project.name = request.input('project_name')
    project.description = request.input('project_description')
    project.purpose = request.input('project_purpose')
    project.tagline = request.input('project_tagline')

    yield project.save()

    let registered_project = yield Project.findBy('name', request.input('project_name'))
    registered_project = registered_project.toJSON()

    let project_id = registered_project.id

    let image = null
    let imageName = null
    let imagePath = null
    let imageExt = null

    if (request.file('project_image') !== undefined && request.file('project_image') !== null && request.file('project_image') !== '' && request.file('project_image').clientSize() !== 0) {
      if (!fs.existsSync(Helpers.publicPath('img/storage/organisations/projects_' + project_id))) {
        fs.mkdirSync(Helpers.publicPath('img/storage/organisations/projects_' + project_id))
      }

      image = request.file('project_image', {
        maxSize: '10mb',
        allowedExtensions: ['jpg', 'png', 'jpeg', 'gif', 'webp']
      })

      imageName = `${new Date().getTime()}_${image.clientName()}`

      yield image.move(Helpers.publicPath('img/storage/organisations/projects_' + project_id), imageName)

      if (!image.moved()) {
        response.badRequest(image.errors())
        return
      }

      imagePath = Env.get('MANAGE_URL', 'localhost:4040') + 'img/storage/organisations/projects_' + project_id + '/' + imageName
      imageExt = image.extension()

      const affectedRows = yield Database
        .table('projects')
        .where('id', project_id)
        .update({ image: imagePath })
    }


    const projectOwner = new ProjectOwner()
    projectOwner.project_id = project_id
    projectOwner.user_id = user.id
    yield projectOwner.save()

    const organisationProject = new OrganisationProject()
    organisationProject.project_id = project_id
    organisationProject.organisation_id = organisation_id
    yield organisationProject.save()


    const project_doc = new ProjectDoc()
    project_doc.project_id = project_id
    project_doc.need_volunteers = request.input('need_volunteers') ? true : false
    project_doc.volunteers_number = request.input('volunteers_number') ? request.input('volunteers_number') : 0
    project_doc.need_fund = request.input('need_fund') ? true : false
    project_doc.fund_amount = request.input('fund_amount') ? request.input('fund_amount') : 0
    project_doc.timebound_bool = request.input('timebound_bool') ? true : false
    project_doc.project_deadline = request.input('project_deadline')

    yield project_doc.save()

    yield request
        .with({success: 'Project added successfully!'})
        .flash()

    response.redirect('back')
    return
  }

  * viewProject (request,response) {
    let user = yield User.find(request.currentUser.id)
    user = user.toJSON()

    const id = request.param('id')

    let projectDetails = yield ProjectOwner.query().where('project_id', id).with('user','project').fetch()
    let volunteers = yield Volunteer.query().where('project_id', id).with('user').fetch()
    let donators = yield Donator.query().where('project_id',id).with('user').fetch()

    projectDetails = projectDetails.toJSON()
    volunteers = volunteers.toJSON();
    donators = donators.toJSON();

    // var info = {
    //   author: data[0].user.username,
    //   project_name: data[0].project.name,
    //   tag_line: data[0].project.tag_line,
    //   tag: data[0].project.tag,
    //   project_description: data[0].project.description,
    //   volunteers: volunteers,
    //   donators: donators
    // };

    // response.ok(projectDetails)

    yield response.sendView('project.view', {
      user: user,
      projectDetails: projectDetails,
      volunteers: volunteers,
      donators: donators
    })
    return
  }

  * getProjects (request, response) {
    let user = yield User.find(request.currentUser.id)

    user = user.toJSON()

    let projects = yield Project.query().orderBy('created_at', 'desc').fetch()
    response.ok(projects)

    yield response.sendView('project.index', {
      user: user,
      projects: projects
    })
    return
  }
}

module.exports = ProfileController
