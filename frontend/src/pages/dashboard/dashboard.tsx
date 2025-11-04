import { InfoCard, SalesPerMonth } from './components'
import type { SalesMonthData } from '@/types/dashboard'

const salesData: SalesMonthData[] = [
	{
		month: 'Enero',
		totalSales: 999999,
		salesWhitDiscount: 320000
	},
	{
		month: 'Febrero',
		totalSales: 1000000,
		salesWhitDiscount: 260000
	},
	{
		month: 'Marzo',
		totalSales: 800000,
		salesWhitDiscount: 500000
	},
	{
		month: 'Abril',
		totalSales: 1200000,
		salesWhitDiscount: 300000
	},
	{
		month: 'Mayo',
		totalSales: 1200000,
		salesWhitDiscount: 500000
	},
	{
		month: 'Junio',
		totalSales: 1300000,
		salesWhitDiscount: 250000
	},
	{
		month: 'Julio',
		totalSales: 1500000,
		salesWhitDiscount: 500000
	},
	{
		month: 'Agosto',
		totalSales: 1800000,
		salesWhitDiscount: 500000
	},
	{
		month: 'Septiembre',
		totalSales: 1500000,
		salesWhitDiscount: 250000
	},
	{
		month: 'Octubre',
		totalSales: 2200000,
		salesWhitDiscount: 200000
	},
	{
		month: 'Noviembre',
		totalSales: 1900000,
		salesWhitDiscount: 500000
	},
	{
		month: 'Diciembre',
		totalSales: 1500000,
		salesWhitDiscount: 300000
	}
]

export function Dashboard() {
	return (
		<>
			<section className="w-full">
				<article className="p-5 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
					<InfoCard title="Ventas totales" value="$1.000.000" bgColor="#005599" />
					<InfoCard title="Usuarios totales" value="500" bgColor="#125634" />
					<InfoCard title="Juegos totales" value="100" bgColor="#ff66aa" />
				</article>
				<article className="w-full">
					<h2 className="text-2xl font-bold mb-4">Ventas por mes</h2>
					<SalesPerMonth data={salesData} />
				</article>
			</section>
		</>
	)
}
