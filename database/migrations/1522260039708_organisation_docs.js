'use strict'

const Schema = use('Schema')

class OrganisationDocsTableSchema extends Schema {
  // society_registration_certificate
  // memorandum_association
  // certificate_incorporation
  // fcra_certificate
  // a_12_certificate
  // g_80_certificate
  // latest_report
  // auditor_report
  // pan_number
  // tan_number
  up () {
    this.create('organisation_docs', (table) => {
      table.increments()
      table.integer('organisation_id').unsigned().references('id').inTable('organisations').onDelete('CASCADE').onUpdate('CASCADE')
      table.text('society_registration_certificate').nullable()
      table.text('memorandum_association').nullable()
      table.text('certificate_incorporation').nullable()
      table.text('fcra_certificate').nullable()
      table.text('a_12_certificate').nullable()
      table.text('g_80_certificate').nullable()
      table.text('latest_report').nullable()
      table.text('auditor_report').nullable()
      table.text('pan_number').nullable()
      table.text('tan_number').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('organisation_docs')
  }

}

module.exports = OrganisationDocsTableSchema
