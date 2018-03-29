'use strict'

const Lucid = use('Lucid')

class ProjectDoc extends Lucid {
  static get table () {
    return 'project_docs'
  }

  project () {
    return this.belongsTo('App/Model/Project')
  }
}

module.exports = ProjectDoc
