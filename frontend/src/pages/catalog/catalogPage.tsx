import { HorizontalCard } from '@/components/game'
import { GCDivider, GCSearchBar } from '@/components/GCgenerics'
import { makeApiCall } from '@/services/apiCall'
import { fallbackGame, QUERY_KEYS } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FilterDropMenu } from './components'
import { useCatalogContext } from './context'

export function CatalogPage() {
	const { genres, setGenres } = useCatalogContext()

	const { isPending, error, data } = useQuery({
		queryKey: [QUERY_KEYS.GET_GENRES_CATALOG],
		queryFn: async () => await makeApiCall<string[]>({ endpoint: '/genres' })
	})

	useEffect(() => {
		if (!data || error) return
		setGenres(data)
	}, [data])

	const game: (typeof fallbackGame)[] = new Array(5).fill(fallbackGame)
	return (
		<main className="flex flex-col gap-4">
			<section className="relative flex justify-between items-center mb-2">
				<h3 className="text-2xl font-semibold">Games Catalog</h3>
				<span className="flex items-center gap-4">
					<GCSearchBar placeholder="Search name" />
					<FilterDropMenu />
				</span>
				<GCDivider className="translate-y-2!" />
			</section>
			<article className="flex flex-wrap justify-center gap-3 lg:justify-start lg:gap-5">
				{game.map((g, i) => {
					return <HorizontalCard game={g} key={i} />
				})}
			</article>
		</main>
	)
}
