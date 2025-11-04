import type { GameModel } from '@/models'
export const SERVER_URL = 'http://localhost:5104/' as const

export type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type ResponsesTypes = GameModel
