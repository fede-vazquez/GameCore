import { InfoCard } from './InfoCard'
import { Grid } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { AdminRoutes } from '@/services/apiCall/routes'
import { makeApiCall } from '@/services/apiCall'

interface GeneralInfoResponse {
	totalSales: number
	totalUsers: number
	totalGames: number
}

export function GeneralInfo() {
	const { data, isLoading, error } = useQuery<GeneralInfoResponse>({
		queryKey: ['generalInfo'],
		queryFn: async () => {
			try {
				const response = await makeApiCall<GeneralInfoResponse>({
					endpoint: AdminRoutes.DASHBOARD_GENERAL_INFO,
					httpMethod: 'GET'
				})
				return response
			} catch (err) {
				throw err
			}
		}
	})

	if (isLoading) {
		return <div>Cargando datos...</div>
	}

	if (error) {
		return <div>Error al cargar los datos: {error instanceof Error ? error.message : 'Error desconocido'}</div>
	}

	if (!data) {
		return <div>No hay datos disponibles</div>
	}

	return (
		<div className="p-5">
			<h2 className="text-4xl">Información general</h2>

			<Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="4" width="auto">
				<InfoCard title="Ventas totales" value={data.totalSales.toString()} bgColor="#000000" />
				<InfoCard title="Usuarios totales" value={data.totalUsers.toString()} bgColor="#125634" />
				<InfoCard title="Juegos totales" value={data.totalGames.toString()} bgColor="#ff66aa" />
			</Grid>
		</div>
	)
}
