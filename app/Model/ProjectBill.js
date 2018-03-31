'use strict'

const Lucid = use('Lucid')

class ProjectBill extends Lucid {
  static get table () {
    return 'project_bills'
  }

  project () {
    return this.belongsTo('App/Model/Project')
  }
}

module.exports = ProjectBill
