'use strict'

const Lucid = use('Lucid')
const Hash = use('Hash')

class User extends Lucid {
  static boot () {
    super.boot()

    /**
     * Hashing password before storing to the
     * database.
     */
    this.addHook('beforeCreate', function * (next) {
      this.password = yield Hash.make(this.password)
      yield next
    })
  }

  static get table () {
    return 'users'
  }

  static get hidden () {
    return ['password']
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }
}

module.exports = User
