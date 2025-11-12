import type { HTTPConstructor } from '../types'

export const LibraryRoutes = {
	LIBRARY: '/Library'
} as const

export type AllLibraryRoutes = (typeof LibraryRoutes)[keyof typeof LibraryRoutes]

export const LIBRARY_URLENDPOINTS: HTTPConstructor<AllLibraryRoutes> = {
	'/Library': {
		v1: {
			url: 'v1/Library',
			GET: {
				requiredFields: null,
				JWTRequired: true
			}
		}
	}
} as const
