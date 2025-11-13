import { useState } from 'react'
import { SalesPerMonthChart } from './SalesPerMonthChart'
import { PieChardComponent } from '../PieChardComponent'
import type { SalesMonthData } from '@/models/dashboard'
import { AdminRoutes } from '@/services/apiCall/routes'
import { SERVER_URL } from '@/utils'
import { useQuery } from '@tanstack/react-query'

interface SalesMonthDataResponse {
	monthlySales: SalesMonthData[]
	firstSaleYear: number
	lastSaleYear: number
}

export function SalesPerMonth() {
	const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear())

	const { data, isLoading, error } = useQuery<SalesMonthDataResponse>({
		queryKey: ['salesPerMonth', yearSelected],
		queryFn: async () => {
			const response = await fetch(
				`${SERVER_URL}${AdminRoutes.DASHBOARD_YEAR_SALES.replace('{year}', yearSelected.toString())}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3NjI5OTE2NjEsImV4cCI6MTc2MzA3ODA2MSwiaWF0IjoxNzYyOTkxNjYxfQ.obfXF9_3PaxiL92-YogfOZUYX4_9rADK_ah_CHxVrb4'}`
					}
				}
			)
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

	let years: number[] = [yearSelected]

	if (data) {
		years = Array.from({ length: data.lastSaleYear - data.firstSaleYear + 1 }, (_, i) => data.firstSaleYear + i)
	}

	return (
		<section>
			<div className="p-3">
				<label className="text-2xl">
					Información de ventas del año:
					<select className="ml-3" value={yearSelected} onChange={(e) => setYearSelected(Number(e.target.value))}>
						{years.reverse().map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</label>
			</div>

			{data && (
				<section className="w-full flex flex-col lg:flex-row gap-4">
					<article className="w-full">
						<h2 className="text-2xl font-bold mb-4 text-center">Ventas por mes</h2>
						<SalesPerMonthChart data={data?.monthlySales} />
					</article>
					<article className="w-full">
						<h2 className="text-2xl font-bold mb-4 text-center">Comparativa ventas</h2>
						<PieChardComponent
							data={[
								{
									name: 'Ventas totales',
									value: data.monthlySales.reduce((acc, sale) => acc + sale.totalSales, 0),
									color: '#00C49F'
								},
								{
									name: 'Ventas con descuento',
									value: data.monthlySales.reduce((acc, sale) => acc + sale.totalSalesWithDiscount, 0),
									color: '#0088FE'
								}
							]}
						/>
					</article>
				</section>
			)}
		</section>
	)
}
