import type { HTTPConstructor } from '../types'

export const AuthRoutes = {
	REGISTER: '/auth/register',
	LOGIN: '/auth/login'
} as const

export type AllAuthRoutes = (typeof AuthRoutes)[keyof typeof AuthRoutes]

export const AUTH_URLENDPOINTS: HTTPConstructor<AllAuthRoutes> = {
	'/auth/login': {
		v1: {
			url: 'v1/auth/login',
			POST: {
				requiredFields: null,
				JWTRequired: false
			}
		}
	},
	'/auth/register': {
		v1: {
			url: 'v1/auth/register',
			POST: {
				requiredFields: null,
				JWTRequired: false
			}
		}
	}
} as const
