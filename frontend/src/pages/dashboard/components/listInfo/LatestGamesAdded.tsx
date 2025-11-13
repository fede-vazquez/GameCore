import { GCList } from '@/components/GCgenerics'
import type { GameModel } from '@/models'
import { useQuery } from '@tanstack/react-query'
import { AdminRoutes } from '@/services/apiCall/routes'
import { SERVER_URL } from '@/utils'
import type { GetGameDTO } from '@/models'

interface LatestGamesAddedResponse {
	lastGamesAdded: GetGameDTO[]
}

export function LatestGamesAdded({ genre }: { genre: string }) {
	const { data, isLoading, error } = useQuery<LatestGamesAddedResponse>({
		queryKey: ['latestGamesAddedByGenre', genre],
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

	console.log(data)
	return (
		<article>
			{data && (
				<GCList
					dataList={data?.lastGamesAdded}
					type="list"
					controlDirection="vertical"
					fnMap={(game) => (
						<div
							className="flex gap-2 items-center justify-between"
							aria-label={`nombre: ${game.title} - fecha de agregado: ${new Date(game.releaseDate).toLocaleDateString()}`}
						>
							<h3 className="font-bold">{game.title}</h3>
							<span>{new Date(game.releaseDate).toLocaleDateString()}</span>
						</div>
					)}
				/>
			)}
		</article>
	)
}
