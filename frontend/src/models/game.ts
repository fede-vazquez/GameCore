export interface GameModel {
	id: number
	title: string
	description: string
	price: number
	// developer: Developer
	releaseDate: Date
	imageUrl: string
	createdAt: Date
	deletedAt: Date
}

// todo: just this in another file
interface GetDeveloperDTO {
	id: number
	name: string
}

interface GetDiscountForGameDTO {
	id: number
	percentageValue: number
	startDate: string
	endDate: string
}

export interface GenreDTO {
	id: number
	name: string
}

export interface GetGameDTO {
	id: number
	title: string
	description: string
	imageUrl: string
	price: number
	releaseDate: string
	developer: GetDeveloperDTO
	discount: GetDiscountForGameDTO | null
	genres: GenreDTO[]
	isActive: boolean
	metacriticScore?: number
	achievements?: any[]
}

export interface GameListResponse {
	items: GetGameDTO[]
	totalCount: number
	pageNumber: number
	pageSize: number
	totalPages: number
}
