import type { BestSellingGames } from '@/models/dashboard'
import { BestSellingGamesChart } from './BestSellingGamesChart'
import { useQuery } from '@tanstack/react-query'
import { AdminRoutes } from '@/services/apiCall/routes'
import { makeApiCall } from '@/services/apiCall/makeApiCall'

interface BestSellingGamesProps {
	genre: string
}

interface BestSellingGamesResponse {
	bestSellingGames: BestSellingGames[]
}

export function BestSellingGames({ genre }: BestSellingGamesProps) {
	const { data, isLoading, error } = useQuery<BestSellingGamesResponse>({
		queryKey: ['bestSellingGames', genre],
		queryFn: async () => {
			const response = await makeApiCall<BestSellingGamesResponse>({
				endpoint: AdminRoutes.DASHBOARD_GENRE,
				opts: {
					parameter: genre
				}
			})
			return response
		}
	})

	if (isLoading) {
		return <div>Cargando datos...</div>
	}

	if (error) {
		return <div>Error al cargar los datos</div>
	}

	return <>{data && <BestSellingGamesChart data={data.bestSellingGames} />}</>
}
