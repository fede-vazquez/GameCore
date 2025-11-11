import type { CustomError } from '@/errors'
import type { SetState } from '@/utils'
import { createContext } from 'react'

interface catalogContextArgs {
	genres: string[]
	setGenres: SetState<string[]>
	isPending: boolean
	error: CustomError | null
	startTransition: (cb: () => void) => void
}

export const CatalogContext = createContext<catalogContextArgs>({} as catalogContextArgs)

export * from './catalogContext'
