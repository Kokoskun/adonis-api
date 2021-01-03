'use strict'
const Model = use('Model')
class Country extends Model {
	static get table () {
		return 'countries'
	}
	currencies () {
		return this.hasMany('App/Models/Currency','id','country_id')
	}
	static async createCountry(country) {
		const newCountry = await this.create(country)
		return newCountry.toJSON()
	}
	static async createCountryCurrencies(country,currencies) {
		const newCountry = await this.create(country)
		const newCurrencies = await newCountry.currencies().createMany(currencies)
		return newCurrencies.map((currency) => currency.toJSON())
	}
	static boot () {
		super.boot()
		this.addHook('beforeSave',['CountryHook.validate','CountryHook.hashCode'])
	}
}

module.exports = Country