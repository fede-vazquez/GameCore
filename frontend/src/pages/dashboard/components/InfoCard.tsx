interface InfoCardProps {
	title: string
	value: string
	bgColor: string
	extraStyles?: string
}

export function InfoCard({ title, value, bgColor, extraStyles }: InfoCardProps) {
	return (
		<div className={`p-4 bg-card shadow rounded-2xl ${extraStyles}`} style={{ backgroundColor: bgColor }}>
			<h2 className="text-lg mb-4">{title}</h2>
			<p className="text-2xl font-bold mb-4">{value}</p>
		</div>
	)
}
