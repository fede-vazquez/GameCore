import { z } from 'zod'

export const FIELDS_FORM = {
	TITLE: 'title',
	DESCRIPTION: 'description',
	PRICE: 'price',
	METACRITIC_SCORE: 'metacriticScore',
	RELEASE_DATE: 'releaseDate',
	IMAGE_URL: 'imageUrl',
	DEVELOPER_ID: 'developerId',
	IS_ACTIVE: 'isActive',
	GENRE_IDS: 'genreIds'
} as const

export const gameFormSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'El título debe tener al menos 3 caracteres' })
		.max(50, { message: 'El título no puede tener más de 50 caracteres' }),
	description: z.string().max(200, { message: 'La descripción no puede tener más de 200 caracteres' }),
	price: z
		.number('El precio es requerido')
		.min(0, { message: 'El precio debe ser mayor o igual a 0' })
		.max(999, { message: 'El precio no puede ser mayor a 999' }),
	metacriticScore: z
		.number()
		.min(0, { message: 'El puntaje debe ser al menos 0' })
		.max(100, { message: 'El puntaje no puede ser mayor a 100' }),
	releaseDate: z.date('La fecha de lanzamiento es requerida'),
	imageUrl: z
		.instanceof(FileList)
		.refine((files) => files.length > 0, { message: 'Debe seleccionar una imagen' })
		.refine((files) => files[0]?.size <= 5 * 1024 * 1024, {
			message: 'El archivo no debe superar los 5MB'
		})
		.refine((files) => ['image/jpeg', 'image/png', 'image/webp'].includes(files[0]?.type), {
			message: 'Solo se permiten imágenes (JPEG, PNG, WEBP)'
		})
		.optional(),
	genreIds: z.array(z.number()).min(1, { message: 'Debe seleccionar al menos un género' })
})

export type GameFormData = z.infer<typeof gameFormSchema>

export const SVG_CLASS = 'absolute left-1.5 top-2 *:text-zinc-500'
