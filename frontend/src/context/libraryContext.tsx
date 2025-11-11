import { CLIENT_ERROR, CustomError } from '@/errors'
import { useTransitionError } from '@/hooks'
import type { GameModel } from '@/models'
import { useContext, useState, type ReactNode } from 'react'
import { LibraryContext } from '.'

export function LibraryContextProvider({ children }: { children: ReactNode }) {
	const { error, isPending, startTransition } = useTransitionError()
	const [libraryGames, setLibraryGames] = useState<GameModel[]>([])

	return (
		<LibraryContext.Provider
			value={{
				libraryGames,
				setLibraryGames,
				startLibTransition: startTransition,
				isPending,
				error
			}}
		>
			{children}
		</LibraryContext.Provider>
	)
}

export function useLibraryContext() {
	const ctx = useContext(LibraryContext)

	if (!ctx) throw new CustomError(CLIENT_ERROR.CONTEXT_BADUSE)

	return ctx
}
