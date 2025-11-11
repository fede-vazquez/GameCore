import { CLIENT_ERROR, CustomError, SERVER_ERROR } from '@/errors/customErrorMsg'
import { MAX_FETCH_TIMEOUT, SERVER_URL, type HTTPMethods } from '@/utils'
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
	httpMethod?: HTTPMethods
	endpoint: AllAdminRoutes | AllAuthRoutes | AllGameRoutes | AllGenresRoutes | AllLibraryRoutes

	body?: Record<string, Array<unknown> | string | number>
	opts?: {
		filters?: Record<string, string | number>
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

export async function makeApiCall<T>({ httpMethod = 'GET', endpoint, body, opts }: ApiCallParams) {
	// ["/", "admin/games/{id}"] -> ["admin", "/games/{id}"]
	const path = endpoint.split('/')[1].split('/')[0]
	const hasFilter = path.at(-1) === '?'

	// games? -> /games
	const matchingRoute =
		MATCH_ROUTES_TO_OBJECT[
			('/' + (hasFilter ? path.substring(0, path.length - 1) : path)) as keyof typeof MATCH_ROUTES_TO_OBJECT
		]

	if (!matchingRoute) throw new CustomError(CLIENT_ERROR.WRONG_URL)

	const route = matchingRoute[endpoint as keyof typeof matchingRoute]
	if (!route) throw new CustomError(CLIENT_ERROR.INVALID_ROUTE)

	const version = opts?.version ?? 'v1'

	const validFetchArgs = route?.[version]?.[httpMethod]

	if (!validFetchArgs) throw new CustomError(CLIENT_ERROR.INVALID_HTTP_OR_VER)

	const filters = opts?.filters ?? {}
	const headers = {
		...(body != null && { 'Content-Type': 'application/json' })
		// ...(JWTRequired && { Authorization: `Bearer ${'jwtJson'}` })
	} as const

	try {
		//transform filters/urlSearch params into strings
		const urlSearchParams = hasFilter
			? Object.entries(filters)
					.filter(([_, v]) => v)
					.map(([k, v]) => {
						return [k, v.toString()]
					})
			: [[]]

		const data = await fetch(
			`${SERVER_URL}${endpoint}${hasFilter ? new URLSearchParams(urlSearchParams).toString() : ''}`,
			{
				method: httpMethod,
				headers: {
					...headers
				},
				...(body != null && { body: JSON.stringify(body ?? {}) }),
				signal: AbortSignal.timeout(MAX_FETCH_TIMEOUT)
			}
		)

		if (!data.ok) throw new CustomError(data.status === 404 ? SERVER_ERROR.CANT_REACH : undefined)

		return (await data.json()) as T
	} catch (err) {
		//todo: this is horrible, just to catch the AbortSignalErr. fix later
		if (err instanceof DOMException) throw new CustomError(CLIENT_ERROR.TIMEOUT_FETCH)
		if (err instanceof CustomError) throw new CustomError(err.message as any)

		console.log(err)
		throw new CustomError()
	}
}
