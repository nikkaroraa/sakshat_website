'use strict'

const Lucid = use('Lucid')

class Organisation extends Lucid {
  static get table () {
    return 'organisations'
  }
}

module.exports = Organisation
