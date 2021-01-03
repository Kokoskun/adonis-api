'use strict'
const User = use('App/Models/User')
const Validate = use('App/Utils/Validate')
const Logger = use('Logger')
const Hash = use('Hash')
class UserController {
	async index ({ request, response }) {
		try {
			const { email, name, phone } = request.only(['email', 'name', 'phone'])
			let userQuery = User.query().where('active', true)
			if(email){
				userQuery = userQuery.where('email','LIKE','%'+email+'%')
			}
			if(name){
				userQuery = userQuery.where('name','LIKE','%'+name+'%')
			}
			if(phone){
				userQuery = userQuery.where('phone','LIKE','%'+phone+'%')
			}
			const users = await userQuery.select('id','email','name','phone').fetch()
			const data = users.toJSON()
			return response.ok({result: 'success',data:data})
		} catch (error) {
			const { code, message } = error
			const ip = request.ip()
			if (error instanceof Error && message) {
				if(code){
					Logger.transport('error').error('Controller "UserController.index" '+ip+': '+JSON.stringify(message).substring(0,100))
				}else{
					Logger.transport('error').warning('Controller "UserController.index" '+ip+': ' + message)
					return response.badRequest({result:'error',message:message})
				}
			}else{
				Logger.transport('error').error('Controller "UserController.index" '+ip+': '+JSON.stringify(error).substring(0,100))
			}
			return response.internalServerError({result:'error',message:'An error has occurred on the server'})
		}
	}
	async show ({ request, response, params }) {
		try {
			const user = await User.query().where('active', true).where('id', params.id).select('id','email','name','phone').first()
			if(user){
				return response.ok({result: 'success',json:user})
			}else{
				return response.notFound({result:'error',message:'User not found'})
			}
		} catch (error) {
			const { code, message } = error
			const ip = request.ip()
			if (error instanceof Error && message) {
				if(code){
					Logger.transport('error').error('Controller "UserController.show" '+ip+': '+JSON.stringify(message).substring(0,100))
				}else{
					Logger.transport('error').warning('Controller "UserController.show" '+ip+': ' + message)
					return response.badRequest({result:'error',message:message})
				}
			}else{
				Logger.transport('error').error('Controller "UserController.show" '+ip+': '+JSON.stringify(error).substring(0,100))
			}
			return response.internalServerError({result:'error',message:'An error has occurred on the server'})
		}
	}
	async store ({ request, response }) {
		try {
			const { email, name, phone, password } = request.only(['email', 'name', 'phone', 'password'])
			if(email && name && password){
				const user = await User.query().where('active', true).where('email', email).select('id').first()
				if(user){
					return response.notAcceptable({result:'error',message:'Email is already in use'})
				}else{
					const data = await User.createUser({
						email : email,
						name: name,
						phone: phone,
						password: password
					})
					return response.ok({result: 'success',json:{
						id: data.id
					}})
				}
			}else{
				return response.badRequest({result:'error',message:'Email, Name, Password can not be empty'})
			}
		} catch (error) {
			const { code, message } = error
			const ip = request.ip()
			if (error instanceof Error && message) {
				if(code){
					Logger.transport('error').error('Controller "UserController.store" '+ip+': '+JSON.stringify(message).substring(0,100))
				}else{
					Logger.transport('error').warning('Controller "UserController.store" '+ip+': ' + message)
					return response.badRequest({result:'error',message:message})
				}
			}else{
				Logger.transport('error').error('Controller "UserController.store" '+ip+': '+JSON.stringify(error).substring(0,100))
			}
			return response.internalServerError({result:'error',message:'An error has occurred on the server'})
		}
	}

	async update ({ request, response, params }) {
		try {
			const { name, phone, password } = request.only(['name', 'phone', 'password'])
			if(name || phone || password){
				let body = {}
				let isBody = false
				if(name){
					body.name = name
					isBody = true
				}
				if(phone){
					const valPhone = await Validate.hashPhone(phone)
					if(valPhone){
						body.phone = valPhone
						isBody = true
					}
				}
				if(password){
					const valPassword = await Validate.hashPassword(password)
					if(valPassword){
						body.password = await Hash.make(valPassword)
						isBody = true
					}
				}
				if(isBody){
					const user = await User.query().where('id', params.id).where('active', true).update(body).limit(1).returning(['id', 'email', 'name', 'phone'])
					if(user&&user[0]){
						return response.ok({result: 'success',json:user[0]})
					}else{
						return response.notFound({result:'error',message:'User not found'})
					}
				}
			}
			return response.badRequest({result:'error',message:'Body is empty!'})
		} catch (error) {
			const { code, message } = error
			const ip = request.ip()
			if (error instanceof Error && message) {
				if(code){
					Logger.transport('error').error('Controller "UserController.update" '+ip+': '+JSON.stringify(message).substring(0,100))
				}else{
					Logger.transport('error').warning('Controller "UserController.update" '+ip+': ' + message)
					return response.badRequest({result:'error',message:message})
				}
			}else{
				Logger.transport('error').error('Controller "UserController.update" '+ip+': '+JSON.stringify(error).substring(0,100))
			}
			return response.internalServerError({result:'error',message:'An error has occurred on the server'})
		}
	}
	async destroy ({ request, response, params }) {
		try {
			const user = await User.query().where('id', params.id).where('active', true).update({active:false,deleted_at:new Date()}).limit(1).returning(['id'])
			if(user&&user[0]){
				return response.ok({result: 'success'})
			}else{
				return response.notFound({result:'error',message:'User not found'})
			}
		} catch (error) {
			const { code, message } = error
			const ip = request.ip()
			if (error instanceof Error && message) {
				if(code){
					Logger.transport('error').error('Controller "UserController.destroy" '+ip+': '+JSON.stringify(message).substring(0,100))
				}else{
					Logger.transport('error').warning('Controller "UserController.destroy" '+ip+': ' + message)
					return response.badRequest({result:'error',message:message})
				}
			}else{
				Logger.transport('error').error('Controller "UserController.destroy" '+ip+': '+JSON.stringify(error).substring(0,100))
			}
			return response.internalServerError({result:'error',message:'An error has occurred on the server'})
		}
	}
}

module.exports = UserController