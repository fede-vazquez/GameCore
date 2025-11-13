import type { HTTPConstructor } from '../types'

export const AdminRoutes = {
	GAMES: '/Admin/games',
	GAMES_ID: '/Admin/games/{id}',
	DASHBOARD_GENRE: '/Admin/dashboard/genre/{genre}',
	DASHBOARD_YEAR_SALES: '/Admin/dashboard/sales/{year}',
	DASHBOARD_GENERAL_INFO: '/Admin/dashboard/generalInfo'
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
	},
	'/Admin/dashboard/genre/{genre}': {
		v1: {
			url: 'v1/Admin/dashboard/genre/{genre}',
			GET: {
				requiredFields: null,
				JWTRequired: true
			}
		}
	},
	'/Admin/dashboard/sales/{year}': {
		v1: {
			url: 'v1/Admin/dashboard/sales/{year}',
			GET: {
				requiredFields: null,
				JWTRequired: true
			}
		}
	},
	'/Admin/dashboard/generalInfo': {
		v1: {
			url: 'v1/Admin/dashboard/generalInfo',
			GET: {
				requiredFields: null,
				JWTRequired: true
			}
		}
	}
} as const
