import type { GameModel, GenreDTO } from '@/models'
export const SERVER_URL = 'https://gamecorebackendutn-fnhkf6f5gdahfad7.brazilsouth-01.azurewebsites.net' as const

export const MAX_FETCH_TIMEOUT = 5000 as const //5 secs

export type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type ResponsesTypes = GameModel
export type SetState<T extends any> = React.Dispatch<React.SetStateAction<T>>

export const QUERY_KEYS = {
	GET_LIBRARY_GAMES: 'library_games',
	GET_DISCOUNT_GAMES: 'discount_games',
	GET_GENRES_CATALOG: 'genres_catalog',
	GET_GAMES: 'games_catalog',
	GET_GAME_BY_GENRE: (id: number | undefined) => `specific_game_by_genre_${id ?? 0}`,
	GET_SPECIFIC_GAME: (id: string | undefined) => `specific_game_${id ?? 0}`
} as const

export const TOKEN_KEY = 'JWT_KEY_IMPORTANT_DO_NOT_LEAK' as const

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

export const LIST_OF_GENRES_DTO: GenreDTO[] = [
	{ id: 0, name: 'Action' },
	{ id: 1, name: 'Adventure' },
	{ id: 2, name: 'Role-Playing Game' },
	{ id: 3, name: 'Simulation' },
	{ id: 4, name: 'Strategy' },
	{ id: 5, name: 'Puzzle' },
	{ id: 6, name: 'Sports' },
	{ id: 7, name: 'Racing' },
	{ id: 8, name: 'Fighting' },
	{ id: 9, name: 'Platformer' },
	{ id: 10, name: 'Survival' },
	{ id: 11, name: 'Horror' },
	{ id: 12, name: 'Rhythm' },
	{ id: 13, name: 'MMORPG' },
	{ id: 14, name: 'MOBA' },
	{ id: 15, name: 'Battle Royale' },
	{ id: 16, name: 'Stealth' },
	{ id: 17, name: 'Sandbox' },
	{ id: 18, name: 'Visual Novel' },
	{ id: 19, name: 'Card Game' }
] as const
