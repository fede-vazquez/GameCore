import type { UserModel } from '@/models'
import { createContext } from 'react'

type setState<T extends any> = React.Dispatch<React.SetStateAction<T>>

export interface globalContextArgs {
	clientUser: (Partial<UserModel> & Pick<UserModel, 'Id' | 'Username'>) | undefined
	setClientUser: setState<globalContextArgs['clientUser']>
}

export const GlobalContext = createContext<globalContextArgs>({} as globalContextArgs)

export * from './globalContext'
