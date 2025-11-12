import type { HTTPConstructor } from '../types'

export const AdminRoutes = {
	GAMES: '/Admin/games',
	GAMES_ID: '/Admin/games/{id}'
} as const

export type AllAdminRoutes = (typeof AdminRoutes)[keyof typeof AdminRoutes]

export const ADMIN_URLENDPOINTS: HTTPConstructor<AllAdminRoutes> = {
	'/Admin/games': {
		v1: {
			url: 'v1/Admin/games',
			POST: {
				requiredFields: null,
				JWTRequired: true
			}
		}
	},
	'/Admin/games/{id}': {
		v1: {
			url: 'v1/Admin/games/{id}',
			PUT: {
				requiredFields: null,
				JWTRequired: true
			},
			DELETE: {
				requiredFields: null,
				JWTRequired: true
			}
		}
	}
} as const
