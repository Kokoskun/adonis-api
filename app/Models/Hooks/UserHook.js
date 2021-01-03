'use strict'
const Hash = use('Hash')
const Validate = use('App/Utils/Validate')
const regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const UserHook = exports = module.exports = {}
UserHook.validate = (user) => {
	const typeOfEmail = typeof user.email
	const typeOfName = typeof user.name
	const typeOfPassword = typeof user.password
	if((typeOfEmail !== undefined) && (typeOfEmail===null)){
		throw new Error('Email is required')
	}else if((typeOfName !== undefined) && (typeOfName===null)){
		throw new Error('Name is required')
	}else if((typeOfPassword !== undefined) && (typeOfPassword===null)){
		throw new Error('Password is required')
	}
}
UserHook.hashPhone = async (user) => {
	if(user.phone){
		const phone = await Validate.hashPhone(user.phone)
		if(phone){
			user.phone = phone
		}
	}
}
UserHook.hashEmail = (user) => {
	if(user.email){
		const email = user.email
		if(regexp.test(email)){
			user.email = email.toLowerCase()
		}else{
			throw new Error('Invalid email address format')
		}
	}
}
UserHook.hashPassword = async (user) => {
	if(user.password){
		const password = await Validate.hashPassword(user.password)
		if(password){
			user.password = await Hash.make(password)
		}
	}
}