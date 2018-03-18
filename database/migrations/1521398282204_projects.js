'use strict'

const Schema = use('Schema')

class ProjectsTableSchema extends Schema {

  up () {
    this.create('projects', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.text('description').notNullable()
      table.float('target_budget').defaultTo(0)
      table.float('dsi_rating').defaultTo(10)
      table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }

}

module.exports = ProjectsTableSchema
