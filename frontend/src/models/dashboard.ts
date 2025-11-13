export interface SalesMonthData {
	monthNumber: number
	month: string
	totalSales: number
	totalSalesWithDiscount: number
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
