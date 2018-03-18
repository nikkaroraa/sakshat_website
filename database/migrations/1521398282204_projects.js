'use strict'

const Schema = use('Schema')

class ProjectsTableSchema extends Schema {

  up () {
    this.create('projects', (table) => {
      table.increments()
      table.string('name')
      table.text('description')
      table.float('target_budget')
      table.float('dsi_rating')
      table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }

}

module.exports = ProjectsTableSchema
