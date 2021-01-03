'use strict'
const Schema = use('Schema')
class UsersSchema extends Schema {
  async up () {
    const tableName = 'users'
    const exists = await this.hasTable(tableName)
    if (!exists)  {
      this.create(tableName, (table) => {
       table.increments()
       table.string('email', 255).notNullable()
       table.string('name', 255).notNullable()
       table.string('phone', 15)
       table.string('password', 255).notNullable()
       table.boolean('active').notNullable().defaultTo(true)
       table.timestamp('created_at').notNullable().defaultTo(this.fn.now())
       table.timestamp('updated_at')
       table.timestamp('deleted_at')
     })
    }
  }
  down () {
    this.dropIfExists('users')
  }
}
module.exports = UsersSchema