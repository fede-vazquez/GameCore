import type { BestSellingGames } from '@/models/dashboard'
import { BestSellingGamesChart } from './BestSellingGamesChart'
import { useQuery } from '@tanstack/react-query'
import { AdminRoutes } from '@/services/apiCall/routes'
import { SERVER_URL } from '@/utils'

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
			const url = `${SERVER_URL}${AdminRoutes.DASHBOARD_GENRE.replace('{genre}', genre)}`
			console.log(url)
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3NjI5OTE2NjEsImV4cCI6MTc2MzA3ODA2MSwiaWF0IjoxNzYyOTkxNjYxfQ.obfXF9_3PaxiL92-YogfOZUYX4_9rADK_ah_CHxVrb4'}`
				}
			})
			if (!response.ok) {
				throw new Error('Error')
			}
			const data = await response.json()
			return data
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
