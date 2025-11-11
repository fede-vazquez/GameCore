import { ElementSlider } from '@/components/GCgenerics/ElementSlider'
import { useLibraryContext } from '@/context'
import type { GameModel } from '@/models'
import { makeApiCall } from '@/services/apiCall'
import { QUERY_KEYS } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function LibraryPage() {
	const { isPending, libraryGames } = useLibraryContext()

	const [enabled, setEnabled] = useState<boolean>(true)
	const { data, isPending: descPend } = useQuery({
		queryKey: [QUERY_KEYS.GET_DISCOUNT_GAMES],
		queryFn: async () => {
			try {
				return await makeApiCall<GameModel[]>({
					endpoint: '/games?',
					opts: { filters: { minDiscount: 0, maxDiscount: 100 } }
				})
			} catch {
				return []
			}
		},
		refetchOnMount: false,
		enabled: enabled
	})

	useEffect(() => {
		if (!data) return
		setEnabled(false)
	}, [data])

	return (
		<main className="flex flex-col gap-y-5">
			<ElementSlider isPending={isPending} elements={libraryGames} titleName="Your Library" />
			<ElementSlider
				isPending={descPend}
				elements={data}
				titleName="Today discounts"
				fallbackMsg={{ description: "Seems there's no discounts today, huh?" }}
			/>
		</main>
	)
}
