'use strict'
const Hash = use('Hash')
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
UserHook.hashPhone = (user) => {
	if(user.phone){
		const phone = user.phone.toString().replace(/[^0-9]/g,'')
		const phoneLength = phone.length
		if(phoneLength > 9 && phoneLength < 15){
			user.phone = phone
		}else{
			throw new Error('Invalid Phone ('+phone+'), Must be at least 10 characters')
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
	const password = user.password
	if(password){
		const passwordLength = password.toString().length
		if(passwordLength < 6 || passwordLength > 100){
			throw new Error('Password must be at least 6 characters and max 100 characters')
		}else{
			user.password = await Hash.make(user.password)
		}
	}
}