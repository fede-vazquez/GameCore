import { CLIENT_ERROR, CustomError } from '@/errors'
import type { UserModel } from '@/models'
import { TOKEN_USER_INFO } from '@/utils'
import { useContext, useState, type ReactNode } from 'react'
import { GlobalContext, type globalContextArgs } from '.'

const getUserInfo = () => {
	try {
		return (JSON?.parse(localStorage?.getItem(TOKEN_USER_INFO) ?? '') as UserModel) ?? undefined
	} catch (error) {
		localStorage.removeItem(TOKEN_USER_INFO)
		return undefined
	}
}

export function GlobalContextProvider({ children }: { children: ReactNode }) {
	const [clientUser, setClientUser] = useState<globalContextArgs['clientUser']>(getUserInfo())
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

	if (!ctx) throw new CustomError(CLIENT_ERROR.CONTEXT_BADUSE)

	return ctx
}
