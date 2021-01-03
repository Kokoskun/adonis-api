'use strict'
const Env = use('Env')
const JWT = require("jsonwebtoken")
const Logger = use('Logger')
class Token {
	handle ({ request, response }, next) {
		try {
			const authorization = request.header('authorization')
			if (authorization) {
				const access = authorization.split(" ");
				const token = access[1];
				if (token && access[0] === "Bearer") {
					JWT.verify(token, Env.get('JWT_KEY'), async function(err, data) {
						if (err) {
							if (err.name === "TokenExpiredError") {
								return response.forbidden({result:'unauthorized',message:'Token expired'})
							} else {
								return response.badRequest({result:'unauthorized',message:'Failed token invalid'})
							}
						} else {
							await next()
						}
					});
				} else {
					return response.badRequest({result:'unauthorized',message:'Invalid token format'})
				}
			} else {
				return response.unauthorized({result:'unauthorized',message:'Unauthorized'})
			}
		} catch (error) {
			const { code, message } = error
			const ip = request.ip()
			if (error instanceof Error && message) {
				if(code){
					Logger.transport('error').error('Middleware "Token.handle" '+ip+': '+JSON.stringify(message).substring(0,100))
				}else{
					Logger.transport('error').warning('Middleware "Token.handle" '+ip+': ' + message)
					return response.badRequest({result:'error',message:message})
				}
			}else{
				Logger.transport('error').error('Middleware "Token.handle" '+ip+': '+JSON.stringify(error).substring(0,100))
			}
			return response.internalServerError({result:'error',message:'An error has occurred on the server'})
		}
	}
}

module.exports = Token
