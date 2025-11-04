import type { HTTPConstructor } from '../types'

export const LibraryRoutes = {
	LIBRARY: '/library'
} as const

export type AllLibraryRoutes = (typeof LibraryRoutes)[keyof typeof LibraryRoutes]

export const LIBRARY_URLENDPOINTS: HTTPConstructor<AllLibraryRoutes> = {
	'/library': {
		v1: {
			url: 'v1/library',
			GET: {
				requiredFields: null,
				JWTRequired: true
			}
		}
	}
} as const
