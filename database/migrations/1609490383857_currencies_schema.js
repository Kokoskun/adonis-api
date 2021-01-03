'use strict'
const Schema = use('Schema')
class CurrenciesSchema extends Schema {
	async up () {
		const tableName = 'currencies'
		const exists = await this.hasTable(tableName)
		if (!exists)  {
			this.create(tableName, (table) => {
				table.increments()
				table.integer('country_id').notNullable().references('id').inTable('countries')
				table.float('value').notNullable()
				table.string('unit', 18).notNullable()
				table.boolean('active').notNullable().defaultTo(true)
				table.timestamp('created_at').notNullable().defaultTo(this.fn.now())
				table.timestamp('updated_at')
				table.timestamp('deleted_at')
			})
		}
	}
	down () {
		this.dropIfExists('currencies')
	}
}
module.exports = CurrenciesSchema