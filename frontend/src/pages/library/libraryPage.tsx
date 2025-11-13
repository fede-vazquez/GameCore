import { ElementSlider } from '@/components/GCgenerics/ElementSlider'
import { useLibraryContext } from '@/context'
import type { GameListResponse } from '@/models'
import { makeApiCall } from '@/services/apiCall'
import { QUERY_KEYS } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Carrousel } from './components/Carrousel'

export function LibraryPage() {
	const { isPending, libraryGames, setNonRepeatedGames, nonRepeatedGames } = useLibraryContext()

	const [enabled, setEnabled] = useState<boolean>(true)

	const { data, isPending: descPend } = useQuery({
		queryKey: [QUERY_KEYS.GET_DISCOUNT_GAMES],
		queryFn: async () => {
			try {
				return (
					await makeApiCall<GameListResponse>({
						endpoint: '/Games?',
						opts: { filters: { SortBy: 'discount', Ascending: 'true' } }
					})
				)?.items
			} catch {
				return [] as GameListResponse['items']
			}
		},
		refetchOnMount: false,
		enabled: enabled
	})

	useEffect(() => {
		if (!data) return
		setNonRepeatedGames(
			data.filter(({ id }) => {
				return !libraryGames.find(({ id: lId }) => {
					return id === lId
				})
			})
		)
	}, [data, libraryGames])

	useEffect(() => {
		if (!data) return
		setEnabled(false)
	}, [data])

	return (
		<main className="flex flex-col gap-y-10">
			<Carrousel data={data} />

			<span className="flex flex-col gap-y-10">
				<ElementSlider
					classScroll="bg-neutral-800!"
					classImg="w-[150px]!"
					showPrice={false}
					isPending={isPending}
					elements={libraryGames}
					titleName="Your Library"
				/>
				<ElementSlider
					classImg="w-[100px]!"
					isPending={descPend}
					elements={nonRepeatedGames}
					titleName="Recommendations"
					fallbackMsg={{ description: "Seems there's no discounts today, huh?" }}
				/>
			</span>
		</main>
	)
}
