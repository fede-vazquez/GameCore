import type { HTTPConstructor } from '../types'

export const AdminRoutes = {
	ADMIN: '/admin',
	GAMES: '/admin/games',
	GAMES_ID: '/admin/games/{id}',
	DASHBOARD_GENRE: '/admin/dashboard/genre/{genre}',
	DASHBOARD_YEAR_SALES: '/admin/dashboard/sales/{year}',
	DASHBOARD_GENERAL_INFO: '/admin/dashboard/generalInfo'
} as const

export type AllAdminRoutes = (typeof AdminRoutes)[keyof typeof AdminRoutes]

export const ADMIN_URLENDPOINTS: HTTPConstructor<AllAdminRoutes> = {
	'/admin': {
		v1: {
			url: 'v1/admin',
			GET: {
				requiredFields: null,
				JWTRequired: true
			}
		}
	},
	'/admin/games': {
		v1: {
			url: 'v1/admin/games',
			POST: {
				requiredFields: null,
				JWTRequired: true
			}
		}
	},
	'/admin/games/{id}': {
		v1: {
			url: 'v1/admin/games/{id}',
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
	'/admin/dashboard/genre/{genre}': {
		v1: {
			url: 'v1/admin/dashboard/genre/{genre}',
			GET: {
				requiredFields: null,
				JWTRequired: true
			}
		}
	},
	'/admin/dashboard/sales/{year}': {
		v1: {
			url: 'v1/admin/dashboard/sales/{year}',
			GET: {
				requiredFields: null,
				JWTRequired: true
			}
		}
	},
	'/admin/dashboard/generalInfo': {
		v1: {
			url: 'v1/admin/dashboard/generalInfo',
			GET: {
				requiredFields: null,
				JWTRequired: true
			}
		}
	}
} as const
