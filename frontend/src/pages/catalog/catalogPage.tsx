import { ThrobberSVG } from '@/assets'
import { HorizontalCard } from '@/components/game'
import { GCButton, GCDivider, GCSearchBar } from '@/components/GCgenerics'
import type { GameListResponse, GenreDTO } from '@/models'
import { makeApiCall } from '@/services/apiCall'
import { debouncer, QUERY_KEYS } from '@/utils'
import { useQueries } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FilterDropMenu } from './components'
import { useCatalogContext } from './context'

const INITIAL_PAGE_SIZE = 20 as const

export function CatalogPage() {
	// i can use the remaining props as well, but this the only IMPORTANT module who uses this
	const { genres, setGenres, catalogGames, setCatalogGames, getPrevGames } = useCatalogContext()
	const PAGE_CURRENT = useRef<number>(1)

	//todo: fix this boilerplate oh god
	const [enabled, setEnabled] = useState<boolean>(true)
	const [gameEnabled, setGameEnabled] = useState<boolean>(true)

	//view more button. yes this needs improvement
	const [disabled, setDisabled] = useState<boolean>(false)

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
						const data = (
							await makeApiCall<GameListResponse>({
								endpoint: '/Games?',
								opts: { filters: { PageSize: INITIAL_PAGE_SIZE, PageNumber: PAGE_CURRENT.current, Ascending: 'true' } }
							})
						)?.items

						//save prevoius games instead of doing anoither fetch

						getPrevGames.current = data
						return data
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

	const debouncedSearch = useMemo(() => {
		return debouncer(async (e: string) => {
			const value = e ?? ''
			if (value.length === 0 && catalogGames.length != getPrevGames.current.length)
				setCatalogGames(getPrevGames.current)

			if (value.length < 3) return
			const data = await makeApiCall<GameListResponse>({ endpoint: '/Games?', opts: { filters: { Name: value } } })
			setCatalogGames(data?.items)
		})
	}, [])

	return (
		<main className="flex flex-col gap-4">
			<section
				className="relative flex flex-col gap-y-2 h-fit! items-center mb-2
				md:flex-row md:justify-between"
			>
				<h3 className="text-nowrap text-2xl font-semibold">Games Catalog</h3>
				<span className="flex items-center gap-4">
					<GCSearchBar
						onChange={(e) => debouncedSearch(e?.currentTarget?.value)}
						className="md:max-w-[180px]"
						placeholder="Search name"
					/>
					<FilterDropMenu games={catalogGames} selectOptions={genres} />
				</span>
				<GCDivider className="translate-y-2! bottom-0!" />
			</section>
			<section className="flex flex-col items-center gap-y-5 bg-neutral-900 rounded-xl mb-20">
				<article className="flex justify-evenly  w-full relative p-2 min-h-[200px] flex-wrap gap-3 lg:gap-5">
					{isPending ? (
						<ThrobberSVG className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 animate-spin h-12 w-fit flex grow" />
					) : catalogGames?.length ? (
						catalogGames.map((g) => {
							return <HorizontalCard game={g} key={g.id} discountPercentage={g.discount?.percentageValue} />
						})
					) : (
						<p className="w-full text-center absolute top-1/2 -translate-y-1/2 font-semibold text-xl text-red-400">
							{gameError?.message ?? 'No games available'}
						</p>
					)}
				</article>
				<GCButton
					theme="primary"
					className="mb-5"
					disabled={disabled || !catalogGames.length}
					onClick={async () => {
						try {
							const data = (
								await makeApiCall<GameListResponse>({
									endpoint: '/Games?',
									opts: {
										filters: {
											PageSize: INITIAL_PAGE_SIZE,
											PageNumber: PAGE_CURRENT.current + 1,
											Ascending: 'true'
										}
									}
								})
							)?.items

							console.log(data)

							if (!data.length) return setDisabled(true)

							PAGE_CURRENT.current = PAGE_CURRENT.current + 1
							getPrevGames.current = [...catalogGames, ...data]
							setCatalogGames((prev) => [...prev, ...data])
						} catch {}
					}}
				>
					Load MOREE!!!
				</GCButton>
			</section>
		</main>
	)
}
