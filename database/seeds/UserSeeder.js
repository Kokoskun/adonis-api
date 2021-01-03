'use strict'
const Logger = use('Logger');
const User = use('App/Models/User')
class UserSeeder {
	async run () {
		try {
			const email = 'kokoskun@gmail.com'
			const row = await User.findBy('email',email)
			if(row){
				Logger.transport('seed').notice('Seed "UserSeeder" already exist in database');
			}else{
				const user = await User.createUser({
					email : email,
					name: 'Patipan Nakarin',
					phone: '0846776920',
					password: '123456'
				})
				Logger.transport('seed').info('Seed "UserSeeder" created in database');
			}
		} catch (e) {
			Logger.transport('seed').error('Seed "UserSeeder" not created in database');
		}
	}
}
module.exports = UserSeeder