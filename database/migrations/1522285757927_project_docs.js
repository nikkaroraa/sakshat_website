'use strict'

const Schema = use('Schema')

class ProjectDocsTableSchema extends Schema {
  // need_volunteers
  // volunteers_number
  // need_fund
  // fund_amount
  // timebound_bool
  // project_deadline
  up () {
    this.create('project_docs', (table) => {
      table.increments()
      table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE').onUpdate('CASCADE')
      table.boolean('need_volunteers').defaultTo(false)
      table.integer('volunteers_number').defaultTo(0)
      table.boolean('need_fund').defaultTo(false)
      table.integer('fund_amount').defaultTo(0)
      table.boolean('timebound_bool').defaultTo(false)
      table.date('project_deadline').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('project_docs')
  }

}

module.exports = ProjectDocsTableSchema
