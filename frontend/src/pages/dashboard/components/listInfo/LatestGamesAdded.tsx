import { GCList } from '@/components/GCgenerics'
import type { GetGameDTO } from '@/models'
import { makeApiCall } from '@/services/apiCall'
import { AdminRoutes } from '@/services/apiCall/routes'
import { useQuery } from '@tanstack/react-query'

interface LatestGamesAddedResponse {
	lastGamesAdded: GetGameDTO[]
}

export function LatestGamesAdded({ genre }: { genre: string }) {
	const { data, isLoading, error } = useQuery<LatestGamesAddedResponse>({
		queryKey: ['latestGamesAddedByGenre', genre],
		queryFn: async () => {
			const response = await makeApiCall<LatestGamesAddedResponse>({
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
