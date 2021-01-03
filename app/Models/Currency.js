'use strict'
const Model = use('Model')
class Currency extends Model {
	static get table () {
		return 'currencies'
	}
	static async createCurrency(currency) {
		const newCurrency = await this.create(currency)
		return newCurrency.toJSON()
	}
	static boot () {
		super.boot()
		this.addHook('beforeSave', 'CurrencyHook.validate')
	}
}
module.exports = Currency