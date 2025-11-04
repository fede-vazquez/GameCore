import type { HTTPConstructor } from '../types'

export const GenresRoutes = {
	GENRES: '/genres'
} as const

export type AllGenresRoutes = (typeof GenresRoutes)[keyof typeof GenresRoutes]

export const GENRES_URLENDPOINTS: HTTPConstructor<AllGenresRoutes> = {
	'/genres': {
		v1: {
			url: 'v1/genres',
			GET: {
				requiredFields: null,
				JWTRequired: false
			},
			POST: {
				requiredFields: null,
				JWTRequired: true
			}
		}
	}
} as const
