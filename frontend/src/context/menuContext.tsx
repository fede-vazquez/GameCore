import { CLIENT_ERROR, CustomError } from '@/errors'
import { useContext, useState, type ReactNode } from 'react'
import { MenuContext } from '.'

export function MenuContextProvider({ children }: { children: ReactNode }) {
	const [isMenuActive, setIsMenuActive] = useState<boolean>(false)

	//very lazy way to fix this...
	const [enabled, setEnabled] = useState<boolean>(true)

	return (
		<MenuContext.Provider
			value={{
				isMenuActive,
				setIsMenuActive,
				enabled,
				setEnabled
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
