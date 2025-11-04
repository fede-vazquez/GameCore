import { useEffect, useState } from 'react'
import type { SalesMonthData } from '@/types/dashboard'
import { SalesPerMonth } from './SalesPerMonthChart'

const testData: SalesMonthData[] = [
	{
		month: 'Enero',
		totalSales: 9999,
		salesWhitDiscount: 3200
	},
	{
		month: 'Febrero',
		totalSales: 10000,
		salesWhitDiscount: 2600
	},
	{
		month: 'Marzo',
		totalSales: 8000,
		salesWhitDiscount: 5000
	},
	{
		month: 'Abril',
		totalSales: 12000,
		salesWhitDiscount: 3000
	},
	{
		month: 'Mayo',
		totalSales: 12000,
		salesWhitDiscount: 5000
	},
	{
		month: 'Junio',
		totalSales: 13000,
		salesWhitDiscount: 2500
	},
	{
		month: 'Julio',
		totalSales: 15000,
		salesWhitDiscount: 5000
	},
	{
		month: 'Agosto',
		totalSales: 18000,
		salesWhitDiscount: 5000
	},
	{
		month: 'Septiembre',
		totalSales: 15000,
		salesWhitDiscount: 2500
	},
	{
		month: 'Octubre',
		totalSales: 22000,
		salesWhitDiscount: 2000
	},
	{
		month: 'Noviembre',
		totalSales: 19000,
		salesWhitDiscount: 5000
	},
	{
		month: 'Diciembre',
		totalSales: 15000,
		salesWhitDiscount: 3000
	}
]

export default function SalesPerMonthController() {
	const [salesData, setSalesData] = useState({
		sales: [] as SalesMonthData[],
		firstDate: '',
		lastDate: ''
	})

	const [year, setYear] = useState<string>('')

	const handleYearChange = (year: string) => {
		setYear(year)
		// mock de llamada a la api
		setSalesData({
			sales: testData,
			firstDate: '2022-01-01',
			lastDate: '2025-12-31'
		})
	}

	useEffect(() => {
		// llamar a la api
		handleYearChange(year)
	}, [year])

	const { startYear, endYear } = generateYearRange(salesData.firstDate, salesData.lastDate)

	const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)

	return (
		<>
			<label htmlFor="year-select">
				Seleccione el año:
				{/* Selector del año (la api me trae la fecha más antigua y de ahí los años hasta la fecha actual)*/}
			</label>
			<select value={year} onChange={(e) => handleYearChange(e.target.value)}>
				{years.reverse().map((year) => (
					<option key={year} value={year}>
						{year}
					</option>
				))}
			</select>
			<h2 className="text-2xl font-bold mb-4">Compras por mes de {year}</h2>
			<SalesPerMonth data={salesData.sales} />
		</>
	)
}

const generateYearRange = (startDate: string, endDate: string): { startYear: number; endYear: number } => {
	const startYear = new Date(startDate).getFullYear()
	const endYear = new Date(endDate).getFullYear()

	return { startYear, endYear }
}
