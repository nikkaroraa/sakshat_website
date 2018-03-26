'use strict'

const Schema = use('Schema')

class PostsTableSchema extends Schema {

  up () {
    this.create('posts', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
      table.text('content').nullable()
      table.text('image').nullable()
      table.enu('type', ['Post', 'Photo']).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }

}

module.exports = PostsTableSchema
