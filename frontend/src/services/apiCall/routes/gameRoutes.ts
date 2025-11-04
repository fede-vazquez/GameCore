import type { HTTPConstructor } from '../types'

export const GamesRoutes = {
	GAMES_ID: '/games/{id}',
	GAMES_FILTER: '/games?',
	GAMES_ID_BUY: '/games/{id}/buy'
} as const

export type AllGameRoutes = (typeof GamesRoutes)[keyof typeof GamesRoutes]

export const GAMES_URLENDPOINTS: HTTPConstructor<AllGameRoutes> = {
	'/games/{id}': {
		v1: {
			url: 'v1/games/{id}',
			GET: {
				requiredFields: null,
				JWTRequired: false
			}
		}
	},
	'/games?': {
		v1: {
			url: 'v1/games',
			GET: {
				requiredFields: null,
				JWTRequired: false
			}
		}
	},
	'/games/{id}/buy': {
		v1: {
			url: 'v1/games/{id}/buy',
			POST: {
				requiredFields: null,
				JWTRequired: true
			}
		}
	}
} as const
