import { HorizontalCard } from '@/components/game'
import { GCButton } from '@/components/GCgenerics'
import type { GameListResponse, GetGameDTO } from '@/models'
import { makeApiCall } from '@/services/apiCall'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'wouter'
import { GCList } from '../GCList'

interface GameListProps {
	queryName: string
	filters?: any
}

export default function GameList({ filters, queryName }: GameListProps) {
	//again, needs context
	const prevRes = useRef<GameListResponse['items']>([])
	const [games, setGames] = useState<GameListResponse['items']>(prevRes.current)

	const [enabled, setEnabled] = useState(true)
	const { data, error } = useQuery({
		queryKey: [queryName],
		queryFn: async () => {
			try {
				return (
					await makeApiCall<GameListResponse>({
						endpoint: '/Games?',
						opts: {
							filters: filters
						}
					})
				)?.items
			} catch {
				return []
			}
		},
		enabled: enabled
	})

	useEffect(() => {
		if (!data || !data?.length) return
		setEnabled(false)
		setGames(data)
		prevRes.current = data
	}, [data])

	if (error) {
		return <div>Error al cargar los juegos </div>
	}

	return (
		<>
			{games?.length ? (
				<section className="flex! flex-col! justify-center!">
					<GCList
						dataList={games.map((game) => ({
							...game,
							discountPercentage: game?.discount ? game.discount.percentageValue * 100 : 0
						}))}
						className="mt-4 place-items-center w-full"
						mode="horizontal"
						type="grid"
						fnMap={(game) => <HorizontalCard key={game.id} game={game} discountPercentage={game.discountPercentage} />}
					/>
					<Link href="/games" className="flex justify-center">
						<GCButton theme="primary" className="w-full m-4 max-w-2xl">
							Ver más...
						</GCButton>
					</Link>
				</section>
			) : (
				<span className="grid grid-cols-1 place-items-center sm:grid-cols-2 w-full md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-4">
					{new Array(10).fill(null).map((_, i) => {
						return <HorizontalCard key={i} game={{} as GetGameDTO} discountPercentage={0} isPending={true} />
					})}
				</span>
			)}
		</>
	)
}
