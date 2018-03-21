'use strict'

const Schema = use('Schema')

class OrganisationProjectsTableSchema extends Schema {

  up () {
    this.create('organisation_projects', (table) => {
      table.increments()
      table.integer('organisation_id').unsigned().references('id').inTable('organisations').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE').onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('organisation_projects')
  }

}

module.exports = OrganisationProjectsTableSchema
