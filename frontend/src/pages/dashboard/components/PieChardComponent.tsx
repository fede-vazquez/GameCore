import type { PieChardComponentProps } from '@/types'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import type { NameType, ValueType, Payload } from 'recharts/types/component/DefaultTooltipContent'

export function PieChardComponent({ data }: PieChardComponentProps) {
	const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<Payload<ValueType, NameType>> }) => {
		if (active && payload && payload.length) {
			return (
				<div
					style={{
						backgroundColor: '#333',
						padding: '8px',
						borderRadius: '10px'
					}}
				>
					<p style={{ color: '#f0f0f0', margin: '0' }}>{`${payload[0].name}: ${payload[0].value}`}</p>
				</div>
			)
		}
		return null
	}

	return (
		<ResponsiveContainer width="100%" aspect={1.5} initialDimension={{ width: 320, height: 200 }}>
			<PieChart>
				<Pie
					data={data}
					dataKey="value"
					innerRadius={0}
					outerRadius="auto"
					animationDuration={500}
					label={(props) => {
						if (typeof props.percent == 'number') {
							return `${(props.percent * 100).toFixed(0)}%`
						} else {
							console.error('El valor de percent no es un numero en PieChardComponent')
						}
					}}
					labelLine={false}
					activeShape={{
						filter: 'drop-shadow(0 0 8px #fff)',
						stroke: '#ffffff',
						strokeWidth: 2
					}}
				>
					{data.map((d, i) => (
						<Cell
							key={`cell-${i}`}
							fill={d.color}
							strokeWidth={0}
							style={{
								transition: 'all 0.3s ease',
								filter: 'saturate(1.2)'
							}}
						/>
					))}
				</Pie>
				<Tooltip content={<CustomTooltip />} />
				<Legend layout="vertical" verticalAlign="bottom" align="center" />
			</PieChart>
		</ResponsiveContainer>
	)
}
