'use strict'

const Schema = use('Schema')

class ProjectBillsTableSchema extends Schema {

  up () {
    this.create('project_bills', (table) => {
      table.increments()
      table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('billAmount').notNullable()
      table.text('expenseDescription').notNullable()
      table.text('bill').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('project_bills')
  }

}

module.exports = ProjectBillsTableSchema
