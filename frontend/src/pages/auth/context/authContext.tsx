import { useGlobalContext } from '@/context'
import { CLIENT_ERROR, CustomError } from '@/errors'
import { useTransitionError } from '@/hooks'
import type { RegisterModel } from '@/models'
import { useCallback, useContext, useState, type ReactNode } from 'react'
import { AuthContext } from '.'
import { TABS_PAGES, type ALL_TABS_PAGES } from '../components'

export function AuthContextProvider({ children }: { children: ReactNode }) {
	const { isPending, error, startTransition } = useTransitionError()
	const [activeTab, setActiveTab] = useState<ALL_TABS_PAGES>(TABS_PAGES.LOGIN)

	const { setClientUser } = useGlobalContext()

	const registerUser = useCallback((client: RegisterModel) => {
		setClientUser(client)
	}, [])

	const changeTabToLogin = useCallback(() => setActiveTab(TABS_PAGES.LOGIN), [])

	return (
		<AuthContext.Provider
			value={{
				registerUser,
				changeTabToLogin,
				activeTab,
				setActiveTab,
				isPending,
				error,
				startTransition
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuthContext() {
	const ctx = useContext(AuthContext)

	if (!ctx) throw new CustomError(CLIENT_ERROR.CONTEXT_BADUSE)
	return ctx
}
