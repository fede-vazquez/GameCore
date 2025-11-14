import type { HTTPConstructor } from '../types'

export const DeveloperRoutes = {
	GET_ALL: '/Developer'
} as const

export type AllDevelopersRoutes = (typeof DeveloperRoutes)[keyof typeof DeveloperRoutes]

export const DEVELOPERS_URLENDPOINTS: HTTPConstructor<AllDevelopersRoutes> = {
	'/Developer': {
		v1: {
			url: 'v1/Developer',
			GET: {
				requiredFields: null,
				JWTRequired: false
			}
		}
	}
}
