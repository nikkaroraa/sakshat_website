'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', table => {
      table.increments()
      table.string('name').notNullable().unique()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('phone').unique()
      table.boolean('isSubscriber').defaultTo(false)
      table.boolean('isDonator').defaultTo(false)
      table.boolean('isVolunteer').defaultTo(false)
      table.string('profile_image').nullable()
      table.string('cover_image').nullable()
      table.string('kyc_number').nullable()
      table.string('ngo_number').nullable()
      table.text('about').nullable()
      table.string('skills').nullable()
      table.string('languages').nullable()
      table.text('experience').nullable()
      table.text('projects').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
