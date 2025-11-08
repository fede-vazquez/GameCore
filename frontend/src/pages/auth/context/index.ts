import type { CustomError } from '@/errors'
import type { RegisterModel } from '@/models'
import type { SetState } from '@/utils'
import { createContext } from 'react'
import type { ALL_TABS_PAGES } from '../components'

interface authContextArgs {
	registerUser: (c: RegisterModel) => void
	changeTabToLogin: () => void
	activeTab: ALL_TABS_PAGES
	setActiveTab: SetState<ALL_TABS_PAGES>
	isPending: boolean
	error: CustomError | null
	startTransition: (cb: () => void) => void
}

export const AuthContext = createContext<authContextArgs>({} as authContextArgs)

export * from './authContext'
