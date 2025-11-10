import type { UserModel } from '@/models'
import type { SetState } from '@/utils'
import { createContext } from 'react'

//! global context
export interface globalContextArgs {
	clientUser: (Partial<UserModel> & Pick<UserModel, 'Id' | 'Username'>) | undefined
	setClientUser: SetState<globalContextArgs['clientUser']>
}

export const GlobalContext = createContext<globalContextArgs>({} as globalContextArgs)

export * from './globalContext'

//! menu context
export interface menuContextArgs {
	isMenuActive: boolean
	setIsMenuActive: SetState<boolean>
}

export const MenuContext = createContext<menuContextArgs>({} as menuContextArgs)

export * from './menuContext'
