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
	GET_PAY_METHOD: 'payment_method',
	GET_GAME_BY_GENRE: (id: number | undefined) => `specific_game_by_genre_${id ?? 0}`,
	GET_SPECIFIC_GAME: (id: string | undefined) => `specific_game_${id ?? 0}`
} as const

export const TOKEN_KEY = 'JWT_KEY_IMPORTANT_DO_NOT_LEAK' as const
export const TOKEN_USER_INFO = 'USER_INFO' as const

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

export function FormatDateISO(dateString: string) {
	try {
		const formatter = new Intl.DateTimeFormat('fr-CA', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			timeZone: 'UTC'
		}).format(new Date(dateString))

		return formatter
	} catch (error) {
		return 'Error'
	}
}

export const DEBOUNCER_DEFAULT_DELAY = 500

export function debouncer<T extends Function>(
	func: T,
	delay: number = DEBOUNCER_DEFAULT_DELAY
): (...args: any[]) => void {
	let timeoutId: ReturnType<typeof setTimeout>
	return function (this: any, ...args: any[]) {
		const context = this
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => {
			func.apply(context, args)
		}, delay)
	}
}
export const WHY_USE_IT = [
	{
		id: 'instant-download',
		title: 'Descarga instantánea',
		description: 'Descarga tus juegos en minutos'
	},
	{
		id: 'insuperable-prices',
		title: 'Precios insuperables',
		description: 'Los mejores precios para los mejores juegos'
	},
	{
		id: 'extensive-catalog',
		title: 'Catalogo extenso',
		description: 'Todos los juegos que buscas'
	},
	{
		id: 'secure-purchases',
		title: 'Compras seguras',
		description: 'Compra sin preocupaciones'
	}
]

// https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
export const stringToColor = (str: string) => {
	let hash = 0
	str.split('').forEach((char) => {
		hash = char.charCodeAt(0) + ((hash << 10) - hash)
	})

	const hue = hash % 180
	const saturation = 90
	const lightness = 65
	return `${hue}, ${saturation}%, ${lightness}%`
}
