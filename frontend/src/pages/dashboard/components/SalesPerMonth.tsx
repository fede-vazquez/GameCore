import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import type { SalesMonthData } from '@/types/dashboard'

interface SalesPerMonthProps {
	data: SalesMonthData[]
}

export function SalesPerMonth({ data }: SalesPerMonthProps) {
	if (data.length === 0) return <div className="p-5">No hay datos de ventas</div>

	return (
		<div className="p-5">
			<BarChart style={{ width: '100%', maxHeight: '70vh', aspectRatio: 1.5 }} responsive data={data}>
				<CartesianGrid strokeDasharray="5" strokeOpacity={0.5} />
				<XAxis dataKey="month" />
				<YAxis width="auto" domain={[0, (dataMax: number) => dataMax * 1.2]} />
				<Tooltip contentStyle={{ backgroundColor: '#333', color: '#f0f0f0', borderRadius: '10px', padding: '10px' }} />
				<Legend />
				<Bar
					dataKey="totalSales"
					name="Ventas totales"
					fill="#8884d8"
					activeBar={<Rectangle fill="pink" stroke="blue" />}
				/>
				<Bar
					dataKey="salesWhitDiscount"
					name="Ventas con descuento"
					fill="#82ca9d"
					activeBar={<Rectangle fill="gold" stroke="purple" />}
				/>
			</BarChart>
		</div>
	)
}
