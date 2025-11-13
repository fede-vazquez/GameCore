import { CLIENT_ERROR, CustomError } from '@/errors'
import { useTransitionError } from '@/hooks'
import type { GameListResponse } from '@/models'
import { useContext, useState, type ReactNode } from 'react'
import { LibraryContext } from '.'

export function LibraryContextProvider({ children }: { children: ReactNode }) {
	const { error, isPending, startTransition } = useTransitionError()
	const [libraryGames, setLibraryGames] = useState<GameListResponse['items']>([])
	const [nonRepeatedGames, setNonRepeatedGames] = useState<GameListResponse['items']>([])

	return (
		<LibraryContext.Provider
			value={{
				libraryGames,
				setLibraryGames,
				startLibTransition: startTransition,
				isPending,
				error,
				nonRepeatedGames,
				setNonRepeatedGames
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
