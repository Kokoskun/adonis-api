'use strict'
const Schema = use('Schema')
class CountriesSchema extends Schema {
	async up () {
		const tableName = 'countries'
		const exists = await this.hasTable(tableName)
		if (!exists)  {
			this.create(tableName, (table) => {
				table.increments()
				table.string('code', 90).notNullable().unique()
				table.string('name', 255).notNullable()
				table.string('currency_unit', 18).notNullable()
				table.timestamp('created_at').notNullable().defaultTo(this.fn.now())
				table.timestamp('updated_at')
			})
		}
	}
	down () {
		this.dropIfExists('countries')
	}
}
module.exports = CountriesSchema