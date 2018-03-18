'use strict'

const Schema = use('Schema')

class OrganisationsTableSchema extends Schema {

  up () {
    this.create('organisations', (table) => {
      table.increments()
      table.string('name')
      table.float('credibility_score')
      table.string('website')
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('organisations')
  }

}

module.exports = OrganisationsTableSchema
