'use strict'

const Lucid = use('Lucid')

class ProjectOwner extends Lucid {
  static get table () {
    return 'project_owners'
  }

  project () {
    return this.belongsTo('App/Model/Project')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = ProjectOwner
