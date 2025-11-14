import { CLIENT_ERROR, CustomError, SERVER_ERROR } from '@/errors/customErrorMsg'
import { MAX_FETCH_TIMEOUT, SERVER_URL, TOKEN_KEY, TOKEN_USER_INFO, type HTTPMethods } from '@/utils'
import { QueryClient } from '@tanstack/react-query'
import {
	ADMIN_URLENDPOINTS,
	AUTH_URLENDPOINTS,
	GAMES_URLENDPOINTS,
	LIBRARY_URLENDPOINTS,
	type AllAdminRoutes,
	type AllAuthRoutes,
	type AllGameRoutes,
	type AllLibraryRoutes
} from './routes'
import type { Versioning } from './types'

export const queryClient = new QueryClient()

interface ApiCallParams {
	httpMethod?: HTTPMethods
	endpoint: AllAdminRoutes | AllAuthRoutes | AllGameRoutes | AllLibraryRoutes

	body?: Record<string, Array<unknown> | string | number> | null
	opts?: {
		filters?: Record<string, string | number>
		version?: Versioning
		parameter?: string
	}
}

const MATCH_ROUTES_TO_OBJECT = {
	'/Library': LIBRARY_URLENDPOINTS,
	'/Admin': ADMIN_URLENDPOINTS,
	'/auth': AUTH_URLENDPOINTS, // for some reason, in lower case
	'/Games': GAMES_URLENDPOINTS
} as const

export async function makeApiCall<T>({ httpMethod = 'GET', endpoint, body = null, opts }: ApiCallParams) {
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

	// Buscar cualquier parámetro en el formato {parametro}
	const paramMatch = endpoint.match(/\{([^}]+)\}/)
	const hasParam = paramMatch !== null
	const paramName = paramMatch ? paramMatch[1] : ''
	const paramStart = hasParam ? paramMatch.index! : -1

	try {
		//transform filters/urlSearch params into strings
		const urlSearchParams = hasFilter
			? Object.entries(filters)
					.filter(([_, v]) => v)
					.map(([k, v]) => [k, v.toString()])
			: []

		// Construir la URL final
		let finalUrl = `${SERVER_URL}/api`

		if (hasParam && opts?.parameter !== undefined) {
			// Reemplazar {parametro} con el valor proporcionado
			finalUrl +=
				endpoint.substring(0, paramStart) + opts.parameter + endpoint.substring(paramStart + paramName.length + 2)
		} else {
			finalUrl += endpoint
		}

		// Añadir parámetros de consulta si existen
		if (hasFilter && urlSearchParams.length > 0) {
			const queryString = new URLSearchParams(urlSearchParams).toString()
			finalUrl += `${queryString}`
		}

		const data = await fetch(finalUrl, {
			method: httpMethod,
			headers: {
				//shouldnt be doing this for each call but okay....
				Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY) ?? ''}`,
				...(body != null && { 'Content-Type': 'application/json' })
			},
			...(body != null && { body: JSON.stringify(body ?? {}) }),
			signal: AbortSignal.timeout(MAX_FETCH_TIMEOUT)
			// temp fix
			// ...(endpoint === '/auth/login' && { credentials: 'include' })
		})

		//horrible code
		if (!data.ok && data.status === 404) throw new CustomError(SERVER_ERROR.CANT_REACH)
		if (!data.ok && data.status === 401) throw new CustomError(SERVER_ERROR.NO_AUTHORIZED)

		const dataJson = await data.json()

		if (!data.ok && 'message' in dataJson) throw new CustomError(dataJson?.message)

		//quick fix
		if ('token' in dataJson) {
			if ('user' in dataJson) localStorage.setItem(TOKEN_USER_INFO, JSON.stringify(dataJson?.user ?? ''))
			localStorage.setItem(TOKEN_KEY, dataJson?.token)
		}

		return dataJson as T
	} catch (err) {
		//todo: this is horrible, just to catch the AbortSignalErr. fix later
		if (err instanceof DOMException) throw new CustomError(CLIENT_ERROR.TIMEOUT_FETCH)
		if (err instanceof CustomError) throw new CustomError(err.message as any)

		throw new CustomError()
	}
}
