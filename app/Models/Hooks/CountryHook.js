'use strict'
const CountryHook = exports = module.exports = {}
CountryHook.validate = (country) => {
	const typeOfCode = typeof country.code
	const typeOfName = typeof country.name
	const typeOfCurrencyUnit = typeof country.currency_unit
	if((typeOfCode !== undefined) && (typeOfCode===null)){
		throw new Error('Code is required')
	}else if((typeOfName !== undefined) && (typeOfName===null)){
		throw new Error('Name is required')
	}else if((typeOfCurrencyUnit !== undefined) && (typeOfCurrencyUnit===null)){
		throw new Error('Currency Unit is required')
	}
}
CountryHook.hashCode = (country) => {
	const code = country.code
	if(code){
		const codeString = code.toString()
		if(codeString.length > 90){
			throw new Error('Password must be at max 90 characters')
		}else{
			country.code = codeString.toUpperCase()
		}
	}
}