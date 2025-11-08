import type { RegisterModel } from '@/models'

export interface RegisterAndLoginProps {
	SVG_CLASS: string
	addUser: (user: RegisterModel) => void
}

export * from './login'
export * from './register'
