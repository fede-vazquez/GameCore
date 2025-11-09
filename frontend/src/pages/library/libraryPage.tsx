import { ElementSlider } from '@/components/GCgenerics/ElementSlider'
import type { GameModel } from '@/models'
import { makeApiCall } from '@/services/apiCall'
import { QUERY_KEYS } from '@/utils'
import { useQueries } from '@tanstack/react-query'

export function LibraryPage() {
	const [discountGames, libraryGames] = useQueries({
		queries: [
			{
				queryKey: [QUERY_KEYS.GET_LIBRARY_GAMES],
				queryFn: async () => await makeApiCall<GameModel[]>({ endpoint: '/library' })
			},

			{
				queryKey: [QUERY_KEYS.GET_DISCOUNT_GAMES],
				queryFn: async () => await makeApiCall<GameModel[]>({ endpoint: '/library' })
			}
		]
	})

	return (
		<main className="flex flex-col gap-y-5">
			<ElementSlider elements={libraryGames.data} titleName="Your Library" />
			<ElementSlider
				elements={discountGames.data}
				titleName="Today discounts"
				fallbackMsg={{ description: "Seems there's no discounts today, huh?" }}
			/>
		</main>
	)
}
