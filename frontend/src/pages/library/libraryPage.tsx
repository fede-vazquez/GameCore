import { AsideMenuButton } from '@/components/asidebar'
import { GCSearchBar } from '@/components/GCgenerics'
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
		<>
			<header className="relative w-full flex gap-4 mb-10 bg-neutral-800 p-2 rounded-t-lg">
				<div className="absolute w-full h-0.5 right-0 bg-neutral-700 bottom-0 translate-y-0.5" />

				<AsideMenuButton />

				<GCSearchBar
					placeholder="Start searching..."
					className="w-[380px] border border-zinc-700 *:text-primaryWhite! *:placeholder:text-neutral-400! bg-neutral-900! "
				/>
			</header>

			<main className="flex flex-col gap-y-5">
				<ElementSlider elements={libraryGames.data} titleName="Your Library" />
				<ElementSlider
					elements={discountGames.data}
					titleName="Today discounts"
					fallbackMsg={{ description: "Seems there's no discounts today, huh?" }}
				/>
			</main>
		</>
	)
}
