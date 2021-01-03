'use strict'
const Route = use('Route')
Route.group(() => {
	Route.get('country/:code/currencies', 'CountryController.currencies')
	Route.post('auth/token', 'TokenController.sign')
	Route.resource('user', 'UserController').only(['index','show','store','update','destroy']).middleware(['token'])
}).namespace('V1').prefix('api/v1')