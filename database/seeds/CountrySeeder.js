'use strict'
const Logger = use('Logger');
const Country = use('App/Models/Country')
class CountrySeeder {
	async run () {
		try {
			const row = await Country.findBy('code','US')
			if(row){
				Logger.transport('seed').notice('Seed "CountrySeeder" already exist in database');
			}else{
				const countryCurrencies = await Country.createCountryCurrencies({
					code: 'US',
					name: 'United States',
					currency_unit: 'USD'
				},[{value:0.01,unit:'1 Cent'},{value:0.05,unit:'5 Cent'},{value:0.10,unit:'10 Cent'},{value:0.25,unit:'25 Cent'},{value:1,unit:'1 Dollar'},{value:5,unit:'5 Dollar'},{value:20,unit:'20 Dollar'},{value:50,unit:'50 Dollar'},{value:100,unit:'100 Dollar'}])
				Logger.transport('seed').info('Seed "CountrySeeder" created in database');
			}
		} catch (e) {
			Logger.transport('seed').error('Seed "CountrySeeder" not created in database');
		}
	}
}
module.exports = CountrySeeder