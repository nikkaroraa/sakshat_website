'use strict'

const Schema = use('Schema')

class ProjectPaymentAccountsTableSchema extends Schema {

  up () {
    this.create('project_payment_accounts', (table) => {
      table.increments()
      table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE').onUpdate('CASCADE')
      table.text('pan_number').notNullable()
      table.integer('mobile_number').notNullable()
      table.text('aadhaar_id_number').notNullable()
      table.text('upi_id').nullable()
      table.text('account_number').nullable()
      table.text('ifsc_code').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('project_payment_accounts')
  }

}

module.exports = ProjectPaymentAccountsTableSchema
