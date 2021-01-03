'use strict'
const Logger = use('Logger')
const Country = use('App/Models/Country')
class CountryController {
		async currencies ({ request, response, params}) {
		try {
			const code = params.code.toString().toUpperCase()
			const currencies = await Country.query().where('countries.code', code).innerJoin('currencies', 'countries.id', 'currencies.country_id').where('currencies.active', true).select('currencies.value','currencies.unit','countries.currency_unit').orderBy('currencies.id', 'desc').fetch()
			return response.ok({result: 'success',data:currencies})
		} catch (error) {
			const { code, message } = error
			const ip = request.ip()
			if (error instanceof Error && message) {
				if(code){
					Logger.transport('error').error('Controller "CountryController.currencies" '+ip+': '+JSON.stringify(message).substring(0,100))
				}else{
					Logger.transport('error').warning('Controller "CountryController.currencies" '+ip+': ' + message)
					return response.badRequest({result:'error',message:message})
				}
			}else{
				Logger.transport('error').error('Controller "CountryController.currencies" '+ip+': '+JSON.stringify(error).substring(0,100))
			}
			return response.internalServerError({result:'error',message:'An error has occurred on the server'})
		}
	}
}

module.exports = CountryController
