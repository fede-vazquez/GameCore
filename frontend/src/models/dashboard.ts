export interface SalesMonthData {
	month: string
	totalSales: number
	salesWhitDiscount: number
	totalAmount: number
	totalAmountsavedWhitDiscount: number
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

export interface BestSellingGames {
	title: string
	totalSales: number
}

export interface whitId {
	id: string | number
}
