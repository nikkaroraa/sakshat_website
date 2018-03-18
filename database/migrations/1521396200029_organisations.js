'use strict'

const Schema = use('Schema')

class OrganisationsTableSchema extends Schema {

  up () {
    this.create('organisations', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.float('credibility_score').defaultTo(0)
      table.string('website').nullable()
      table.text('description').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('organisations')
  }

}

module.exports = OrganisationsTableSchema
