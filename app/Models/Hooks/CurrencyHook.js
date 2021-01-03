'use strict'
const CurrencyHook = exports = module.exports = {}
CurrencyHook.validate = (currency) => {
	const typeOfCountryID = typeof currency.country_id
	const typeOfValue = typeof currency.value
	const typeOfUnit = typeof currency.unit
	if((typeOfCountryID !== undefined) && (typeOfCountryID===null)){
		throw new Error('Country ID is required')
	}else if((typeOfValue !== undefined) && (typeOfValue===null)){
		throw new Error('Value is required')
	}else if((typeOfUnit !== undefined) && (typeOfUnit===null)){
		throw new Error('Unit is required')
	}
}