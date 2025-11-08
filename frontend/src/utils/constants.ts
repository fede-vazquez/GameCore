import type { GameModel } from '@/models'
export const SERVER_URL = 'http://localhost:5104/' as const

export const MAX_FETCH_TIMEOUT = 5000 as const //5 secs

export type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type ResponsesTypes = GameModel

export const QUERY_KEYS = {
	REGISTER_FORM: 'register_form'
} as const
