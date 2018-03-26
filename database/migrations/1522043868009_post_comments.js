'use strict'

const Schema = use('Schema')

class PostCommentsTableSchema extends Schema {

  up () {
    this.create('post_comments', (table) => {
      table.increments()
      table.integer('post_id').unsigned().references('id').inTable('posts').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
      table.text('comment').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('post_comments')
  }

}

module.exports = PostCommentsTableSchema
