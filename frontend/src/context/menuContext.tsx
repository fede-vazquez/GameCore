import { CLIENT_ERROR, CustomError } from '@/errors'
import { useContext, useState, type ReactNode } from 'react'
import { MenuContext } from '.'

export function MenuContextProvider({ children }: { children: ReactNode }) {
	const [isMenuActive, setIsMenuActive] = useState<boolean>(false)

	return (
		<MenuContext.Provider
			value={{
				isMenuActive,
				setIsMenuActive
			}}
		>
			{children}
		</MenuContext.Provider>
	)
}

export function useMenuContext() {
	const ctx = useContext(MenuContext)

	if (!ctx) throw new CustomError(CLIENT_ERROR.CONTEXT_BADUSE)
	return ctx
}
