import { ThrobberSVG } from '@/assets'
import { HorizontalCard } from '@/components/game'
import { GCDivider, GCSearchBar } from '@/components/GCgenerics'
import type { GameModel } from '@/models'
import { makeApiCall } from '@/services/apiCall'
import { QUERY_KEYS } from '@/utils'
import { useQueries } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FilterDropMenu } from './components'
import { useCatalogContext } from './context'

export function CatalogPage() {
	const { genres, setGenres } = useCatalogContext()

	//gnr = genre, gme = games
	const [gnr, gme] = useQueries({
		queries: [
			{
				queryKey: [QUERY_KEYS.GET_GENRES_CATALOG],
				queryFn: async () => await makeApiCall<string[]>({ endpoint: '/genres' })
			},
			{
				queryKey: [QUERY_KEYS.GET_LIBRARY_GAMES],
				queryFn: async () => await makeApiCall<GameModel[]>({ endpoint: '/library' })
			}
		]
	})

	useEffect(() => {
		if (!gnr.data || gnr.error) return
		setGenres(gnr.data)
	}, [gnr.data])

	return (
		<main className="flex flex-col gap-4">
			<section
				className="relative flex flex-col gap-y-2 h-fit! items-center mb-2
				md:flex-row md:justify-between"
			>
				<h3 className="text-nowrap text-2xl font-semibold">Games Catalog</h3>
				<span className="flex items-center gap-4">
					<GCSearchBar className="md:max-w-[180px]" placeholder="Search name" />
					<FilterDropMenu games={gme.data} selectOptions={genres} />
				</span>
				<GCDivider className="translate-y-2! bottom-0!" />
			</section>
			<article className="relative bg-neutral-900 p-2 min-h-[200px] flex flex-wrap gap-3 lg:gap-5">
				{gme.isPending ? (
					<ThrobberSVG className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 animate-spin h-12 w-fit flex grow" />
				) : gme?.data?.length ? (
					gme.data.map((g, i) => {
						return <HorizontalCard game={g} key={i} />
					})
				) : (
					<p className="w-full text-center absolute top-1/2 -translate-y-1/2 font-semibold text-xl text-red-400">
						{gme?.error?.message}
					</p>
				)}
			</article>
		</main>
	)
}
