'use strict'

const Schema = use('Schema')

class DonatorsTableSchema extends Schema {

  up () {
    this.create('donators', (table) => {
      table.increments()
      table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
      table.float('amount')
      table.timestamps()
    })
  }

  down () {
    this.drop('donators')
  }

}

module.exports = DonatorsTableSchema
