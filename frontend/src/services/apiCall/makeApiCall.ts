import type { HTTPMethods } from '@/utils'
import { QueryClient } from '@tanstack/react-query'
import {
	ADMIN_URLENDPOINTS,
	AUTH_URLENDPOINTS,
	GAMES_URLENDPOINTS,
	GENRES_URLENDPOINTS,
	LIBRARY_URLENDPOINTS,
	type AllAdminRoutes,
	type AllAuthRoutes,
	type AllGameRoutes,
	type AllGenresRoutes,
	type AllLibraryRoutes
} from './routes'
import type { Versioning } from './types'

export const queryClient = new QueryClient()

interface ApiCallParams {
	httpMethod: HTTPMethods
	endpoint: AllAdminRoutes | AllAuthRoutes | AllGameRoutes | AllGenresRoutes | AllLibraryRoutes

	body?: Record<string, Array<unknown> | string | number>
	opts?: {
		filters?: Record<string, string>
		version?: Versioning
	}
}

const MATCH_ROUTES_TO_OBJECT = {
	'/library': LIBRARY_URLENDPOINTS,
	'/admin': ADMIN_URLENDPOINTS,
	'/auth': AUTH_URLENDPOINTS,
	'/genres': GENRES_URLENDPOINTS,
	'/games': GAMES_URLENDPOINTS
} as const

export async function makeApiCall({ httpMethod, endpoint, body, opts }: ApiCallParams) {
	// ["/", "admin/games/{id}"] -> ["admin", "/games/{id}"]
	const path = endpoint.split('/')[1].split('/')[0]
	const hasFilter = path.at(-1) === '?'

	// games? -> /games
	const matchingRoute =
		MATCH_ROUTES_TO_OBJECT[
			('/' + (hasFilter ? path.substring(0, path.length - 1) : path)) as keyof typeof MATCH_ROUTES_TO_OBJECT
		]

	if (!matchingRoute) throw new Error('wrong url')

	const route = matchingRoute[endpoint as keyof typeof matchingRoute]
	if (!route) throw new Error('invalid route')

	const version = opts?.version ?? 'v1'

	const validFetchArgs = route?.[version]?.[httpMethod]

	if (!validFetchArgs) throw new Error('invalid httpmethod or version')

	const filters = opts?.filters ?? {}
	const headers = {
		...(body != null && { 'Content-Type': 'application/json' })
		// ...(JWTRequired && { Authorization: `Bearer ${'jwtJson'}` })
	} as const

	return await fetch(`${endpoint}${hasFilter ? '?' + new URLSearchParams(filters).toString() : ''}`, {
		headers: {
			...headers
		},
		...(body != null && { body: JSON.stringify(body) })
	})
}
