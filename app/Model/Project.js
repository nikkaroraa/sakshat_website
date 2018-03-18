'use strict'

const Lucid = use('Lucid')

class Project extends Lucid {
  static get table () {
    return 'projects'
  }
}

module.exports = Project
