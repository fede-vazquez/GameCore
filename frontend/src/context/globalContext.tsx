import { useContext, useState, type ReactNode } from 'react'
import { GlobalContext, type globalContextArgs } from '.'

export function GlobalContextProvider({ children }: { children: ReactNode }) {
	const [clientUser, setClientUser] = useState<globalContextArgs['clientUser']>()
	// const [globalError, setGlobalError] = useState<Error>()

	return (
		<GlobalContext.Provider
			value={{
				clientUser,
				setClientUser
			}}
		>
			{/* <p className="absolute bg-red-300s z-20">error :(</p> */}

			{children}
		</GlobalContext.Provider>
	)
}

export function useGlobalContext() {
	const ctx = useContext(GlobalContext)

	if (!ctx) throw new Error('globalContext must be used inside a consumer :P')

	return ctx
}
