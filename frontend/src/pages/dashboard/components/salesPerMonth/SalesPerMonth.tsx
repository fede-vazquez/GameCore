import { useEffect, useState } from 'react'
import { SalesPerMonthChart } from './SalesPerMonthChart'
import { PieChardComponent } from '../PieChardComponent'
import type { SalesMonthData } from '@/types/dashboard'

export function SalesPerMonth() {
	const [salesData, setSalesData] = useState<{
		sales: SalesMonthData[]
		firstYear: number
		lastYear: number
	}>({
		sales: [],
		firstYear: 0,
		lastYear: 0
	})

	const [year, setYear] = useState<number>(new Date().getFullYear())

	const handleYearChange = (year: number) => {
		setYear(year)
		// mock de llamada a la api
		setSalesData({
			sales: testData,
			firstYear: 2022,
			lastYear: 2025
		})
	}

	useEffect(() => {
		// llamar a la api
		handleYearChange(year)
	}, [year])

	const years = Array.from({ length: salesData.lastYear - salesData.firstYear + 1 }, (_, i) => salesData.firstYear + i)

	return (
		<section>
			<div className="p-3">
				<label className="text-2xl">
					Información de ventas del año:
					{/* Selector del año (la api me trae la fecha más antigua y de ahí los años hasta la fecha actual)*/}
					<select className="ml-3" value={year} onChange={(e) => handleYearChange(Number(e.target.value))}>
						{years.reverse().map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</label>
			</div>

			<section className="w-full flex flex-col lg:flex-row gap-4">
				<article className="w-full">
					<h2 className="text-2xl font-bold mb-4 text-center">Ventas por mes</h2>
					<SalesPerMonthChart data={salesData.sales} />
				</article>
				<article className="w-full">
					<h2 className="text-2xl font-bold mb-4 text-center">Comparativa ventas</h2>
					<PieChardComponent
						data={[
							{
								name: 'Ventas totales',
								value: salesData.sales.reduce((acc, sale) => acc + sale.totalSales, 0),
								color: '#00C49F'
							},
							{
								name: 'Ventas con descuento',
								value: salesData.sales.reduce((acc, sale) => acc + sale.salesWhitDiscount, 0),
								color: '#0088FE'
							}
						]}
					/>
				</article>
			</section>
		</section>
	)
}

const testData: SalesMonthData[] = [
	{
		month: 'Enero',
		totalSales: 9999,
		salesWhitDiscount: 3200,
		totalAmount: 9999,
		totalAmountsavedWhitDiscount: 3200
	},
	{
		month: 'Febrero',
		totalSales: 10000,
		salesWhitDiscount: 2600,
		totalAmount: 10000,
		totalAmountsavedWhitDiscount: 2600
	},
	{
		month: 'Marzo',
		totalSales: 8000,
		salesWhitDiscount: 5000,
		totalAmount: 8000,
		totalAmountsavedWhitDiscount: 5000
	},
	{
		month: 'Abril',
		totalSales: 12000,
		salesWhitDiscount: 3000,
		totalAmount: 12000,
		totalAmountsavedWhitDiscount: 3000
	},
	{
		month: 'Mayo',
		totalSales: 12000,
		salesWhitDiscount: 5000,
		totalAmount: 12000,
		totalAmountsavedWhitDiscount: 5000
	},
	{
		month: 'Junio',
		totalSales: 13000,
		salesWhitDiscount: 2500,
		totalAmount: 13000,
		totalAmountsavedWhitDiscount: 2500
	},
	{
		month: 'Julio',
		totalSales: 15000,
		salesWhitDiscount: 5000,
		totalAmount: 15000,
		totalAmountsavedWhitDiscount: 5000
	},
	{
		month: 'Agosto',
		totalSales: 18000,
		salesWhitDiscount: 5000,
		totalAmount: 18000,
		totalAmountsavedWhitDiscount: 5000
	},
	{
		month: 'Septiembre',
		totalSales: 15000,
		salesWhitDiscount: 2500,
		totalAmount: 15000,
		totalAmountsavedWhitDiscount: 2500
	},
	{
		month: 'Octubre',
		totalSales: 22000,
		salesWhitDiscount: 2000,
		totalAmount: 22000,
		totalAmountsavedWhitDiscount: 2000
	},
	{
		month: 'Noviembre',
		totalSales: 19000,
		salesWhitDiscount: 5000,
		totalAmount: 19000,
		totalAmountsavedWhitDiscount: 5000
	},
	{
		month: 'Diciembre',
		totalSales: 15000,
		salesWhitDiscount: 3000,
		totalAmount: 15000,
		totalAmountsavedWhitDiscount: 3000
	}
]
