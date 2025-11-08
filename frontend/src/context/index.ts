import type { UserModel } from '@/models'
import type { SetState } from '@/utils'
import { createContext } from 'react'

export interface globalContextArgs {
	clientUser: (Partial<UserModel> & Pick<UserModel, 'Id' | 'Username'>) | undefined
	setClientUser: SetState<globalContextArgs['clientUser']>
}

export const GlobalContext = createContext<globalContextArgs>({} as globalContextArgs)

export * from './globalContext'
