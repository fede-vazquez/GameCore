import { Box } from '@radix-ui/themes'
import type { InfoCardProps } from '@/models/dashboard'

export function InfoCard({ title, value, bgColor, extraStyles = '' }: InfoCardProps) {
	return (
		<Box asChild tabIndex={0}>
			<div className={`p-4 bg-card shadow rounded-2xl ${extraStyles}`} style={{ backgroundColor: bgColor }}>
				<h2 className="text-lg mb-4">{title}</h2>
				<p className="text-2xl font-bold mb-4">{value}</p>
			</div>
		</Box>
	)
}
