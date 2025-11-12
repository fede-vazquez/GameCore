import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { SalesMonthData } from '@/models/dashboard'

interface SalesPerMonthProps {
	data: SalesMonthData[]
}

export function SalesPerMonthChart({ data }: SalesPerMonthProps) {
	return (
		<ResponsiveContainer width="100%" aspect={1.5} initialDimension={{ width: 320, height: 200 }}>
			<BarChart data={data}>
				<CartesianGrid strokeDasharray="5" strokeOpacity={0.5} />
				<XAxis dataKey="month" />
				<YAxis width="auto" domain={[0, (dataMax: number) => dataMax * 1.2]} />
				<Tooltip
					contentStyle={{
						backgroundColor: '#333',
						color: '#f0f0f0',
						borderRadius: '10px',
						padding: '10px'
					}}
				/>
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
		</ResponsiveContainer>
	)
}
