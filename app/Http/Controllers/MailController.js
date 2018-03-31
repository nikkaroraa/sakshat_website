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
const Mail = use('Mail')


class MailController {

  // let user = yield User.find(request.currentUser.id)
  // user = user.toJSON()
  // let email = user.email
  
  * index (request,response) {

  }
 * textMsg(request,response) {
   yield Mail.send('emails.index',{name:"Ashwin"}, (message) => {
      message.to('aonnosbig@gmail.com', 'Ashwin')
      message.from('Team Sakshat')
      message.subject('Welcome to our website.')
    })
    response.ok();
    return
 }
}

module.exports = MailController
