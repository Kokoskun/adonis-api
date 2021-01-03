'use strict'
const Logger = use('Logger')
const Env = use('Env')
const JWT = require("jsonwebtoken")
class TokenController {
	async sign ({ request, response }) {
		try {
			const authorization = request.header('authorization')
			if (authorization) {
				const access = authorization.split(" ");
				const accessBody = access[1];
				const body = request.only(['grant_type'])
				if (accessBody && body.grant_type && access[0] === "Basic" && body.grant_type === "client_credentials") {
					const buffer = Buffer.from(accessBody, "base64");
					const client = buffer.toString("utf8");
					const clientText = Env.get('CLIENT_ID') + ":" + Env.get('CLIENT_SECRET')
					if (client === clientText) {
						const iat = Date.now() / 1000;
						//24 hour of expiration
						const timeExp = 60 * 60 * 24;
						const token = JWT.sign({ iat: iat, exp: iat + timeExp }, Env.get('JWT_KEY'), { algorithm: "HS256" });
						return response.ok({result: 'success',json:{
							token_type: "Bearer",
							access_token: token,
							expires_in: timeExp
						}})
					}
				}
				return response.forbidden({result:'error',message:'Access Denied'})
			} else {
				return response.unauthorized({result:'error',message:'Unauthorized'})
			}
		} catch (error) {
			const { code, message } = error
			const ip = request.ip()
			if (error instanceof Error && message) {
				if(code){
					Logger.transport('error').error('Controller "TokenController.sign" '+ip+': '+JSON.stringify(message).substring(0,100))
				}else{
					Logger.transport('error').warning('Controller "TokenController.sign" '+ip+': ' + message)
					return response.badRequest({result:'error',message:message})
				}
			}else{
				Logger.transport('error').error('Controller "TokenController.sign" '+ip+': '+JSON.stringify(error).substring(0,100))
			}
			return response.internalServerError({result:'error',message:'An error has occurred on the server'})
		}
	}
}
module.exports = TokenController