'use strict'
const Route = use('Route')
require("./api/v1");
Route.route('*', ({response}) => {
	return response.notFound({result:'error',message:'Service not found'})
})