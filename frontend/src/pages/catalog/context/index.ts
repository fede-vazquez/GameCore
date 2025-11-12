import type { CustomError } from '@/errors'
import type { GameListResponse, GenreDTO } from '@/models'
import type { SetState } from '@/utils'
import { createContext } from 'react'

interface catalogContextArgs {
	genres: GenreDTO[]
	setGenres: SetState<GenreDTO[]>
	isPending: boolean
	error: CustomError | null
	startTransition: (cb: () => void) => void
	catalogGames: GameListResponse['items']
	setCatalogGames: SetState<GameListResponse['items']>
}

export const CatalogContext = createContext<catalogContextArgs>({} as catalogContextArgs)

export * from './catalogContext'
