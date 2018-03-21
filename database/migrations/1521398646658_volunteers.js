'use strict'

const Schema = use('Schema')

class VolunteersTableSchema extends Schema {

  up () {
    this.create('volunteers', (table) => {
      table.increments()
      table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('volunteers')
  }

}

module.exports = VolunteersTableSchema
