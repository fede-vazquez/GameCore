import { ThrobberSVG } from '@/assets'
import { HorizontalCard } from '@/components/game'
import { GCDivider, GCSearchBar } from '@/components/GCgenerics'
import type { GameListResponse, GenreDTO } from '@/models'
import { makeApiCall } from '@/services/apiCall'
import { QUERY_KEYS } from '@/utils'
import { useQueries } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { FilterDropMenu } from './components'
import { useCatalogContext } from './context'

export function CatalogPage() {
	// i can use the remaining props as well, but this the only IMPORTANT module who uses this
	const { genres, setGenres, catalogGames, setCatalogGames } = useCatalogContext()

	//todo: fix this boilerplate oh god
	const [enabled, setEnabled] = useState<boolean>(true)
	const [gameEnabled, setGameEnabled] = useState<boolean>(true)

	const [{ data, error }, { data: gameData, error: gameError, isPending }] = useQueries({
		queries: [
			{
				queryKey: [QUERY_KEYS.GET_GENRES_CATALOG],
				queryFn: async () => {
					try {
						return await makeApiCall<GenreDTO[]>({ endpoint: '/Games/genres' })
					} catch {
						return []
					}
				},
				refetchOnMount: false,
				enabled: enabled
			},
			{
				queryKey: [QUERY_KEYS.GET_GAMES],
				queryFn: async () => {
					try {
						return (await makeApiCall<GameListResponse>({ endpoint: '/Games?', opts: { filters: { PageSize: 10 } } }))
							?.items
					} catch {
						return [] as GameListResponse['items']
					}
				},
				refetchOnMount: false,
				enabled: gameEnabled
			}
		]
	})

	useEffect(() => {
		if (!data || error) return
		setEnabled(false)
		setGenres(data)
	}, [data])

	useEffect(() => {
		if (!gameData || gameError) return
		setGameEnabled(false)
		setCatalogGames(gameData)
	}, [gameData])

	return (
		<main className="flex flex-col gap-4">
			<section
				className="relative flex flex-col gap-y-2 h-fit! items-center mb-2
				md:flex-row md:justify-between"
			>
				<h3 className="text-nowrap text-2xl font-semibold">Games Catalog</h3>
				<span className="flex items-center gap-4">
					<GCSearchBar className="md:max-w-[180px]" placeholder="Search name" />
					<FilterDropMenu games={catalogGames} selectOptions={genres} />
				</span>
				<GCDivider className="translate-y-2! bottom-0!" />
			</section>
			<article className="relative bg-neutral-900 rounded-xl p-2 min-h-[200px] flex flex-wrap gap-3 lg:gap-5">
				{isPending ? (
					<ThrobberSVG className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 animate-spin h-12 w-fit flex grow" />
				) : catalogGames?.length ? (
					catalogGames.map((g, i) => {
						return <HorizontalCard game={g} key={i} />
					})
				) : (
					<p className="w-full text-center absolute top-1/2 -translate-y-1/2 font-semibold text-xl text-red-400">
						{gameError?.message}
					</p>
				)}
			</article>
		</main>
	)
}
