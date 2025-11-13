import type { CustomError } from '@/errors'
import type { GameListResponse, UserModel } from '@/models'
import type { SetState } from '@/utils'
import { createContext } from 'react'

//! global context
export interface globalContextArgs {
	clientUser: UserModel | undefined
	setClientUser: SetState<globalContextArgs['clientUser']>
}

export const GlobalContext = createContext<globalContextArgs>({} as globalContextArgs)

export * from './globalContext'

//! menu context
export interface menuContextArgs {
	isMenuActive: boolean
	setIsMenuActive: SetState<boolean>
	enabled: boolean
	setEnabled: SetState<boolean>
}

export const MenuContext = createContext<menuContextArgs>({} as menuContextArgs)

export * from './menuContext'

//!library games context
export interface libraryContextArgs {
	libraryGames: GameListResponse['items']
	setLibraryGames: SetState<GameListResponse['items']>
	startLibTransition: (cb: () => Promise<void> | void) => void
	isPending: boolean
	error: CustomError | null
}

export const LibraryContext = createContext<libraryContextArgs>({} as libraryContextArgs)

export * from './libraryContext'
