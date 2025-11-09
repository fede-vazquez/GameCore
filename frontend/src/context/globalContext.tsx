import { CLIENT_ERROR, CustomError } from '@/errors'
import { useContext, useState, type ReactNode } from 'react'
import { GlobalContext, type globalContextArgs } from '.'

export function GlobalContextProvider({ children }: { children: ReactNode }) {
	const [clientUser, setClientUser] = useState<globalContextArgs['clientUser']>()
	// const [globalError, setGlobalError] = useState<Error>()
	const [isMenuActive, setIsMenuActive] = useState<boolean>(false)

	return (
		<GlobalContext.Provider
			value={{
				clientUser,
				setClientUser,
				isMenuActive,
				setIsMenuActive
			}}
		>
			{/* <p className="absolute bg-red-300s z-20">error :(</p> */}

			{children}
		</GlobalContext.Provider>
	)
}

export function useGlobalContext() {
	const ctx = useContext(GlobalContext)

	if (!ctx) throw new CustomError(CLIENT_ERROR.CONTEXT_BADUSE)

	return ctx
}
