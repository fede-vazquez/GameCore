import type { GameModel } from '@/models'
export const SERVER_URL = 'http://localhost:5104/' as const

export const MAX_FETCH_TIMEOUT = 5000 as const //5 secs

export type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type ResponsesTypes = GameModel
export type SetState<T extends any> = React.Dispatch<React.SetStateAction<T>>

export const QUERY_KEYS = {
	GET_LIBRARY_GAMES: 'library_games',
	GET_DISCOUNT_GAMES: 'discount_games',
	GET_GENRES_CATALOG: 'genres_catalog'
} as const

export const FUN_FACTS_STRINGS = [
	"90% of the world's data was created in the last two years.",
	'Coding Bugs were NOT named after an actual bug.',
	'The first computer virus was created in 1986.',
	"The world's first electronic computer, the Colossus, was built in 1943.",
	'In 2020, there were over 1.5 billion websites on the internet.',
	'The first computer weighed more than 27 Tons',
	'People blink less when they use computers',
	'The first gigabyte drive cost $40,000'
] as const

export const fallbackGame: GameModel = {
	title: 'Factorio',
	id: Math.floor(Math.random() * 100),
	description: 'The factory must grow.',
	price: 17.99,
	imageUrl: '/fallback_image.png',
	createdAt: new Date(),
	deletedAt: new Date(),
	releaseDate: new Date()
}

export const LIST_OF_GENRES = [
	'Action',
	'Adventure',
	'Role-Playing Game',
	'Simulation',
	'Strategy',
	'Puzzle',
	'Sports',
	'Racing',
	'Fighting',
	'Platformer',
	'Survival',
	'Horror',
	'Rhythm',
	'MMORPG',
	'MOBA',
	'Battle Royale',
	'Stealth',
	'Sandbox',
	'Visual Novel',
	'Card Game'
]
