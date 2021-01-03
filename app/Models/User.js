'use strict'
const Model = use('Model')
const Hash = use('Hash')
class User extends Model {
  static get table () {
    return 'users'
  }
  static get hidden () {
    return ['password']
  }
  static async createUser(user) {
    const newUser = await this.create(user)
    return newUser.toJSON()
  }
  static boot () {
    super.boot()
    this.addHook('beforeSave', ['UserHook.validate','UserHook.hashEmail','UserHook.hashPassword','UserHook.hashPhone'])
  }
}

module.exports = User
