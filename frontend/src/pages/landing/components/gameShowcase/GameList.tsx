import { HorizontalCard } from '@/components/game'
import { GCList } from '../GCList'
import { Link } from 'wouter'
import { GCButton } from '@/components/GCgenerics'
import { useQuery } from '@tanstack/react-query'
import { makeApiCall } from '@/services/apiCall'
import type { GetGameDTO } from '@/models'

interface GameListProps {
	queryName: string
	filters?: any
}

interface GameListResponse {
	items: GetGameDTO[]
	isLoading: boolean
	error: any
}

export default function GameList({ filters, queryName }: GameListProps) {
	const { data, isLoading, error } = useQuery<GameListResponse>({
		queryKey: [queryName],
		queryFn: async () => {
			const response = await makeApiCall<GameListResponse>({
				endpoint: '/Games?',
				opts: {
					filters: filters
				}
			})
			return response
		}
	})

	if (isLoading) {
		return <div>Cargando juegos...</div>
	}

	if (error) {
		return <div>Error al cargar los juegos </div>
	}

	return (
		<>
			{data?.items && (
				<>
					<GCList
						dataList={data.items.map((game) => ({
							...game,
							discountPercentage: game?.discount ? game.discount.percentageValue * 100 : 0
						}))}
						mode="horizontal"
						type="grid"
						fnMap={(game) => <HorizontalCard key={game.id} game={game} discountPercentage={game.discountPercentage} />}
					/>
					<Link href="/games" className="flex justify-center">
						<GCButton theme="primary" className="w-full m-4 max-w-2xl">
							... Ver más
						</GCButton>
					</Link>
				</>
			)}
		</>
	)
}
