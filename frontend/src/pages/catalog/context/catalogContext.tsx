import { CLIENT_ERROR, CustomError } from '@/errors'
import { useTransitionError } from '@/hooks'
import type { GameModel } from '@/models'
import { LIST_OF_GENRES } from '@/utils'
import { useContext, useState, type ReactNode } from 'react'
import { CatalogContext } from '.'

export function CatalogContextProvider({ children }: { children: ReactNode }) {
	const [genres, setGenres] = useState<string[]>(LIST_OF_GENRES)
	const { isPending, error, startTransition } = useTransitionError()

	const [catalogGames, setCatalogGames] = useState<GameModel[]>([])

	return (
		<CatalogContext.Provider
			value={{
				genres,
				setGenres,
				isPending,
				error,
				startTransition,
				catalogGames,
				setCatalogGames
			}}
		>
			{children}
		</CatalogContext.Provider>
	)
}

export function useCatalogContext() {
	const ctx = useContext(CatalogContext)

	if (!ctx) throw new CustomError(CLIENT_ERROR.CONTEXT_BADUSE)
	return ctx
}
