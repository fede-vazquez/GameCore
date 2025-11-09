import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { BestSellingGames } from '@/types/dashboard'

export function BestSellingGamesChart({ data }: { data: BestSellingGames[] }) {
	return (
		<ResponsiveContainer width="100%" aspect={2} initialDimension={{ width: 320, height: 200 }}>
			<BarChart data={data}>
				<CartesianGrid strokeDasharray="5" strokeOpacity={0.5} />
				<XAxis dataKey="title" />
				<YAxis width="auto" domain={[0, (dataMax: number) => dataMax * 1.2]} />
				<Tooltip
					contentStyle={{
						backgroundColor: '#333',
						color: '#f0f0f0',
						borderRadius: '10px',
						padding: '10px'
					}}
				/>
				<Bar
					dataKey="totalSales"
					name="Ventas totales"
					fill="#8884d8"
					activeBar={<Rectangle fill="pink" stroke="blue" />}
				/>
			</BarChart>
		</ResponsiveContainer>
	)
}
