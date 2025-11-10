import type { SetState } from '@/utils'
import { createContext } from 'react'

interface catalogContextArgs {
	genres: string[]
	setGenres: SetState<string[]>
}

export const CatalogContext = createContext<catalogContextArgs>({} as catalogContextArgs)

export * from './catalogContext'
