exports.hashPhone = (value) => {
	const phone = value.toString().replace(/[^0-9]/g,'')
	const phoneLength = phone.length
	if(phoneLength > 9 && phoneLength < 15){
		return phone
	}else{
		throw new Error('Invalid Phone ('+phone+'), Must be at least 10 characters')
	}
	return false
}
exports.hashPassword = (value) => {
	const passwordLength = value.toString().length
	if(passwordLength < 6 || passwordLength > 100){
		throw new Error('Password must be at least 6 characters and max 100 characters')
	}else{
		return value
	}
	return false
}