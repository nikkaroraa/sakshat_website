'use strict'

const Database = use('Database')
const User = use('App/Model/User')
const Project = use('App/Model/Project')
const Volunteer=use('App/Model/Volunteer')
const Donator=use('App/Model/Donator')
const OrganisationOwner = use('App/Model/OrganisationOwner')
const ProjectOwner = use('App/Model/ProjectOwner')
const Helpers = use('Helpers')
const fs = use('fs')
const Env = use('Env')

class ProfileController {
  * index (request,response) {

  }
  * viewProject(request,response) {
     const id = request.param('id');
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
