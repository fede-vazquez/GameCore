export const TABS_PAGES = {
	LOGIN: 'LogIn',
	REGISTER: 'Register'
} as const

export type ALL_TABS_PAGES = (typeof TABS_PAGES)[keyof typeof TABS_PAGES]

export interface RegisterAndLoginProps {
	SVG_CLASS: string
}

export * from './login'
export * from './register'
