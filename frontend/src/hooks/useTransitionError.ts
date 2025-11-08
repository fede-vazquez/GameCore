import { CustomError, EXTRAS_ERROR } from '@/errors'
import { useCallback, useState, useTransition } from 'react'

export function useTransitionError() {
	const [isPending, setTransition] = useTransition()
	const [error, setError] = useState<CustomError | null>(null)

	const setTransitionError = useCallback(
		(cb: () => Promise<void> | void) => {
			setTransition(async () => {
				try {
					await cb()
					setError(null)
				} catch (e) {
					if (e instanceof CustomError) return setError(e)
					setError(new CustomError(EXTRAS_ERROR.UNKNOWN))
				}
			})
		},
		[setTransition]
	)

	return { isPending, error, startTransition: setTransitionError }
}
