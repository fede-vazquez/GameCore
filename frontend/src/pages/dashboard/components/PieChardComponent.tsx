import type { PieChardComponentProps } from '@/types'
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'

export function PieChardComponent({ data }: PieChardComponentProps) {
	return (
		<PieChart width={360} height={200} responsive>
			<Pie data={data} dataKey="value" innerRadius={60} outerRadius={80} paddingAngle={5}>
				{data.map((d, i) => (
					<Cell key={`cell-${i}`} fill={d.color} strokeWidth={0} />
				))}
			</Pie>
			<Tooltip />
			<Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ lineHeight: '2em' }} />
		</PieChart>
	)
}
