import { useEffect, useState } from 'react'
import { InfoCard } from './InfoCard'
import { Grid, Text } from '@radix-ui/themes'

export function GeneralInfo() {
	const [generalInfo, setGeneralInfo] = useState({
		totalSales: 0,
		totalUsers: 0,
		totalGames: 0
	})

	useEffect(() => {
		// Mock de llamada a la api
		const resultadoApi = {
			totalSales: 10000,
			totalUsers: 500,
			totalGames: 100
		}
		setGeneralInfo(resultadoApi)
	}, [])

	return (
		<div className="p-5">
			<h2 className="text-4xl">Información general</h2>

			<Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="4" width="auto">
				<InfoCard title="Ventas totales" value={generalInfo.totalSales.toString()} bgColor="#000000" />
				<InfoCard title="Usuarios totales" value={generalInfo.totalUsers.toString()} bgColor="#125634" />
				<InfoCard title="Juegos totales" value={generalInfo.totalGames.toString()} bgColor="#ff66aa" />
			</Grid>
		</div>
	)
}
