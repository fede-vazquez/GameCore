import { useEffect, useState } from 'react'
import { InfoCard } from './InfoCard'
import { Grid } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { SERVER_URL } from '@/utils'
import { AdminRoutes } from '@/services/apiCall/routes'

interface GeneralInfoResponse {
	totalSales: number
	totalUsers: number
	totalGames: number
}

export function GeneralInfo() {
	const { data, isLoading, error } = useQuery<GeneralInfoResponse>({
		queryKey: ['generalInfo'],
		queryFn: async () => {
			const response = await fetch(`${SERVER_URL}${AdminRoutes.DASHBOARD_GENERAL_INFO}`, {
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
