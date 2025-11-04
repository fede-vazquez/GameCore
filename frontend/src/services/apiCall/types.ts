import type { HTTPMethods, ResponsesTypes } from '@/utils'

export type Versioning = 'v1' // | "v2" | "v3" ...

type removeQuestionChar<T extends string> = T extends `${infer S}?` ? S : T

export type FetchArguments = {
	requiredFields: any // supuestamente aqui van los parametros del body... pero ni idea como lo hare aun
	JWTRequired: boolean
	adapter?: (...args: any[]) => ResponsesTypes
}

// i want to kill myself
export type HTTPConstructor<T extends string> = {
	[k in T]: {
		[v in Versioning]?: {
			// si K (la ruta) termina en / entonces la saca, sino la deja (Y QUITA EL ? del filtro)
			url: k extends `${infer S}/` ? `${v}${S}` : `${v}${removeQuestionChar<k>}`
		} & Partial<Record<HTTPMethods, FetchArguments>>
	}
}
