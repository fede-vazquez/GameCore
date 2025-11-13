import type { CustomError } from '@/errors'
import type { GameListResponse, GenreDTO, GetGameDTO } from '@/models'
import type { SetState } from '@/utils'
import { createContext, type RefObject } from 'react'

interface catalogContextArgs {
	genres: GenreDTO[]
	setGenres: SetState<GenreDTO[]>
	isPending: boolean
	error: CustomError | null
	startTransition: (cb: () => void) => void
	catalogGames: GameListResponse['items']
	setCatalogGames: SetState<GameListResponse['items']>
	getPrevGames: RefObject<GetGameDTO[]>
}

export const CatalogContext = createContext<catalogContextArgs>({} as catalogContextArgs)

export * from './catalogContext'
