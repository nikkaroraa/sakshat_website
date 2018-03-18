'use strict'

const Schema = use('Schema')

class OrganisationOwnersTableSchema extends Schema {

  up () {
    this.create('organisation_owners', (table) => {
      table.increments()
      table.integer('organisation_id').unsigned().references('id').inTable('organisations').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('organisation_owners')
  }

}

module.exports = OrganisationOwnersTableSchema
