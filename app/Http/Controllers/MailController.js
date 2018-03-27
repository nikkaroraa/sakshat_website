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
  * index (request,response) {

  }
 * textMsg(request,response) {
   yield Mail.send('emails.index',{name:"dalip"}, (message) => {
      message.to('dalipkumar703@gmail.com', 'Dalip')
      message.from('contact@techillary.com')
      message.subject('Welcome to the Kitten\'s World')
    })
    response.ok();
    return
 }
}

module.exports = MailController
