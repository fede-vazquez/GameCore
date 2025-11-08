export const ERROR_TYPES = {
	CLIENT: 'CLIENT_ERROR',
	SERVER: 'SERVER_ERROR',
	EXTRAS: 'EXTRAS_ERROR'
} as const

export const CLIENT_ERROR = {
	WRONG_URL: 'Bad provided URL when making a fetch request. Check makeApiCall',
	INVALID_ROUTE: "The provided route doesn't exists in this case",
	INVALID_HTTP_OR_VER: "HTTP Method or Versioning doesn't match with the documented client code",
	TIMEOUT_FETCH: 'Unstable internet, try again later or maybe reboot your router idk',
	CONTEXT_BADUSE:
		"You tried to use a context outside its consumer, if you see this as a normal user we have no idea what we're doing"
} as const

export const SERVER_ERROR = {
	CANT_REACH: "Couldn't reached the server. Try later on, maybe its on maintenance"
} as const

export const EXTRAS_ERROR = {
	UNKNOWN: 'Unknown Error. Time to debug!'
} as const

const ERROR_MAP = {
	[ERROR_TYPES.CLIENT]: CLIENT_ERROR,
	[ERROR_TYPES.SERVER]: SERVER_ERROR,
	[ERROR_TYPES.EXTRAS]: EXTRAS_ERROR
} as const

type returnTypeOf<T> = T[keyof T] extends string ? T[keyof T] : never

type ALL_MESSAGES =
	| returnTypeOf<typeof CLIENT_ERROR>
	| returnTypeOf<typeof SERVER_ERROR>
	| returnTypeOf<typeof EXTRAS_ERROR>

export class CustomError extends Error {
	category: returnTypeOf<typeof ERROR_TYPES>

	constructor(msg: ALL_MESSAGES | undefined = EXTRAS_ERROR.UNKNOWN, category?: returnTypeOf<typeof ERROR_TYPES>) {
		super()
		this.message = msg
		this.category = (category ?? this.lookupCategory(msg) ?? ERROR_TYPES.EXTRAS) as returnTypeOf<typeof ERROR_TYPES>

		this.stack = '' //avoid sussy messages to be exposed
	}

	private lookupCategory(msg: ALL_MESSAGES): string | undefined {
		for (const [cat, meg] of Object.entries(ERROR_MAP)) {
			if (Object.values(meg).includes(msg)) return cat
		}
	}
}
