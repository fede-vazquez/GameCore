import type { HTTPConstructor } from '../types'

export const GamesRoutes = {
	GAMES_ID: '/Games/{id}',
	GAMES_FILTER: '/Games?',
	GAMES_ID_BUY: '/Games/{id}/buy',
	GAMES_GENRES: '/Games/genres',
	GAMES_DISCOUNTS: '/Games/discounts'
} as const

export type AllGameRoutes = (typeof GamesRoutes)[keyof typeof GamesRoutes]

export const GAMES_URLENDPOINTS: HTTPConstructor<AllGameRoutes> = {
	'/Games/{id}': {
		v1: {
			url: 'v1/Games/{id}',
			GET: {
				requiredFields: null,
				JWTRequired: false
			}
		}
	},
	'/Games?': {
		v1: {
			url: 'v1/Games',
			GET: {
				requiredFields: null,
				JWTRequired: false
			}
		}
	},
	'/Games/{id}/buy': {
		v1: {
			url: 'v1/Games/{id}/buy',
			POST: {
				requiredFields: null,
				JWTRequired: true
			}
		}
	},
	'/Games/genres': {
		v1: {
			url: 'v1/Games/genres',
			GET: {
				JWTRequired: false,
				requiredFields: null
			}
		}
	},
	'/Games/discounts': {
		v1: {
			url: 'v1/Games/discounts',
			GET: {
				JWTRequired: false,
				requiredFields: null
			}
		}
	}
} as const
