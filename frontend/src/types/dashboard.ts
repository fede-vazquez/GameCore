export interface SalesMonthData {
	month: string
	totalSales: number
	salesWhitDiscount: number
}

export interface PieChardComponentProps {
	data: { name: string; value: number; color: string }[]
}

export interface InfoCardProps {
	title: string
	value: string
	bgColor: string
	extraStyles?: string
}
