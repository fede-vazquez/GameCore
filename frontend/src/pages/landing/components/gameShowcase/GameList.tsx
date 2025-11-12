import { HorizontalCard } from '@/components/game'
import { GCList } from '../GCList'
import { Link } from 'wouter'
import { GCButton } from '@/components/GCgenerics'
import { useQuery } from '@tanstack/react-query'
import { makeApiCall } from '@/services/apiCall'
import type { AllGameRoutes } from '@/services/apiCall/routes'
import type { GameModel, GetGameDTO } from '@/models'

interface GameListProps {
	fetchUrl: AllGameRoutes
	filters?: any
}

interface GameListResponse {
	items: GetGameDTO[]
	isLoading: boolean
	error: any
}

export default function GameList({ fetchUrl, filters }: GameListProps) {
	const { data, isLoading, error } = useQuery<GameListResponse>({
		queryKey: [fetchUrl],
		queryFn: async () => {
			const response = await makeApiCall<GameListResponse>({
				endpoint: fetchUrl,
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

	console.log(data?.items)

	return (
		<>
			{data?.items && (
				<>
					<GCList
						dataList={data.items.map((game) => ({ ...game, discountPercentage: game.discount.percentageValue * 100 }))}
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
