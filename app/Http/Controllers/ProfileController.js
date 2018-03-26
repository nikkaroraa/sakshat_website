'use strict'

const Database = use('Database')
const User = use('App/Model/User')
const OrganisationOwner = use('App/Model/OrganisationOwner')
const ProjectOwner = use('App/Model/ProjectOwner')
const Helpers = use('Helpers')
const fs = use('fs')
const Env = use('Env')

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
    let allInterests
    if(interests) {
      allInterests = interests.split(",")
    }


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
    let designation = request.input('designation')
    let tagline = request.input('tagline')
    let location = request.input('location')
    let about = request.input('about')
    let skills = request.input('skills')
    let languages = request.input('languages')

    const affectedRows = yield Database
      .table('users')
      .where('id', user.id)
      .update({ name: name, designation: designation, tagline: tagline, location: location, about: about, skills: skills, languages: languages })

    response.redirect('back')
    return
  }

  * updateCoverImage (request, response) {
    let user = yield User.find(request.currentUser.id)

    let image = null
    let imageName = null
    let imagePath = null
    let imageExt = null

    if (request.file('cover_image') !== undefined && request.file('cover_image') !== null && request.file('cover_image') !== '' && request.file('cover_image').clientSize() !== 0) {
      if (!fs.existsSync(Helpers.publicPath('img/storage/users/user_cover_' + user.id))) {
        fs.mkdirSync(Helpers.publicPath('img/storage/users/user_cover_' + user.id))
      }

      image = request.file('cover_image', {
        maxSize: '10mb',
        allowedExtensions: ['jpg', 'png', 'jpeg', 'gif', 'webp']
      })

      imageName = `${new Date().getTime()}_${image.clientName()}`

      yield image.move(Helpers.publicPath('img/storage/users/user_cover_' + user.id), imageName)

      if (!image.moved()) {
        response.badRequest(image.errors())
        return
      }

      imagePath = Env.get('MANAGE_URL', 'localhost:4040') + 'img/storage/users/user_cover_' + user.id + '/' + imageName
      imageExt = image.extension()

      user.cover_image = imagePath
      yield user.save()

      yield request
        .with({success: 'Successfully Uploaded!'})
        .flash()

      response.redirect('back')
      return
    }

    yield request
      .with({error: 'Uploading Failed...'})
      .flash()

    response.redirect('back')
    return
  }

  * updateProfileImage (request, response) {
    let user = yield User.find(request.currentUser.id)

    let image = null
    let imageName = null
    let imagePath = null
    let imageExt = null

    if (request.file('profile_image') !== undefined && request.file('profile_image') !== null && request.file('profile_image') !== '' && request.file('profile_image').clientSize() !== 0) {
      if (!fs.existsSync(Helpers.publicPath('img/storage/users/user_profile_' + user.id))) {
        fs.mkdirSync(Helpers.publicPath('img/storage/users/user_profile_' + user.id))
      }

      image = request.file('profile_image', {
        maxSize: '10mb',
        allowedExtensions: ['jpg', 'png', 'jpeg', 'gif', 'webp']
      })

      imageName = `${new Date().getTime()}_${image.clientName()}`

      yield image.move(Helpers.publicPath('img/storage/users/user_profile_' + user.id), imageName)

      if (!image.moved()) {
        response.badRequest(image.errors())
        return
      }

      imagePath = Env.get('MANAGE_URL', 'localhost:4040') + 'img/storage/users/user_profile_' + user.id + '/' + imageName
      imageExt = image.extension()

      user.profile_image = imagePath
      yield user.save()

      yield request
        .with({success: 'Successfully Uploaded!'})
        .flash()

      response.redirect('back')
      return
    }

    yield request
      .with({error: 'Uploading Failed...'})
      .flash()

    response.redirect('back')
    return
  }
}

module.exports = ProfileController
