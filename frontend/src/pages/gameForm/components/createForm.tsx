import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { makeApiCall } from '@/services/apiCall'
import { Form } from 'radix-ui'
import { StarSVG } from '@/assets/starSvg'
import { GenreCheckboxGroup } from '@/pages/gameForm/components/GenreCheckboxGroup'
import { zodResolver } from '@hookform/resolvers/zod'
import { GCButton, GCInput } from '@/components/GCgenerics'
import { CalendarSVG } from '@/assets/calendarSvg'
import { DollarSVG } from '@/assets/dollarSvg'
import z from 'zod'
import { LIST_OF_GENRES_DTO } from '@/utils/constants'

const FIELDS_FORM = {
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

export interface GameCreateDTO {
	title: string
	description: string
	price: number
	releaseDate: string
	developerId: number
	imageUrl: string
	isActive: boolean
	genreIds: number[]
	metacriticScore: number
}

const SVG_CLASS = 'absolute left-1.5 top-2 *:text-zinc-500'

const gameFormSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'Title must be at least 3 characters long' })
		.max(50, { message: 'Title must be at most 50 characters long' }),
	description: z.string().max(200, { message: 'Description must be at most 200 characters long' }),
	price: z
		.number('The price is required')
		.min(0, { message: 'Price must be at least $0' })
		.max(999, { message: 'Price must be at most $999' }),
	metacriticScore: z.number().min(0).max(100).default(0),
	releaseDate: z.date('The release date is required'),
	imageUrl: z
		.instanceof(FileList)
		.refine((files) => files.length > 0, { message: 'Debe seleccionar una imagen' })
		.refine((files) => files[0]?.size <= 5 * 1024 * 1024, {
			message: 'El archivo no debe superar los 5MB'
		})
		.refine((files) => ['image/jpeg', 'image/png', 'image/webp'].includes(files[0]?.type), {
			message: 'Solo se permiten imágenes (JPEG, PNG, WEBP)'
		}),
	// developerId: z.string().nonempty({ message: 'Developer ID must be a positive number' }),
	genreIds: z
		.array(z.number().refine((id) => LIST_OF_GENRES_DTO.some((genre) => genre.id === id)))
		.nonempty({ message: 'At least one genre must be selected' })
})

type GameFormData = z.infer<typeof gameFormSchema>

export function CreateForm() {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors }
	} = useForm<GameFormData>({
		resolver: zodResolver(gameFormSchema) as any,
		defaultValues: {
			title: '',
			description: '',
			price: 0,
			genreIds: [],
			metacriticScore: 0
		}
	})

	const {
		mutate: createGame,
		isError,
		isSuccess,
		error,
		isPending
	} = useMutation({
		mutationFn: async (data: GameFormData) => {
			const apiData: GameCreateDTO = {
				title: data.title,
				description: data.description,
				price: data.price,
				releaseDate: data.releaseDate.toISOString(),
				// developerId: data.developerId,
				developerId: 1,
				imageUrl: data.imageUrl[0].name,
				isActive: true,
				genreIds: data.genreIds,
				metacriticScore: data.metacriticScore
			}

			const response = await makeApiCall<GameCreateDTO>({
				endpoint: '/Admin/games',
				httpMethod: 'POST',
				body: { ...apiData }
			})
			return response
		}
	})

	const onSubmit = async (data: GameFormData) => {
		createGame(data)
	}

	return (
		<Form.Root onSubmit={handleSubmit(onSubmit)} className="space-y-2 max-w-2xl mx-auto p-6 bg-black rounded-lg shadow">
			{isPending && <p className="text-yellow-500">Creando juego...</p>}
			{isError && <p className="text-red-500">Error al crear el juego: {error.message}</p>}
			{isSuccess && <p className="text-green-500">Juego creado exitosamente</p>}
			<h2 className="text-2xl font-bold text-white text-center">CREAR JUEGO</h2>
			<GCInput
				formFieldName={FIELDS_FORM.TITLE}
				register={register(FIELDS_FORM.TITLE)}
				error={errors[FIELDS_FORM.TITLE]}
				label="Título"
				type="text"
				disableSvgPlaceholder={true}
			/>

			<GCInput
				formFieldName={FIELDS_FORM.PRICE}
				register={register(FIELDS_FORM.PRICE, { valueAsNumber: true })}
				error={errors[FIELDS_FORM.PRICE]}
				label="Precio"
				type="number"
				placeholder="0.00"
			>
				<DollarSVG className={SVG_CLASS} />
			</GCInput>

			<Form.Field name={FIELDS_FORM.DESCRIPTION} className="space-y-2">
				<Form.Label htmlFor={FIELDS_FORM.DESCRIPTION}>Descripción</Form.Label>
				<Form.Control asChild>
					<textarea
						className="w-full border border-zinc-600 rounded-lg py-2 px-2"
						id={FIELDS_FORM.DESCRIPTION}
						{...register(FIELDS_FORM.DESCRIPTION)}
						rows={5}
						placeholder="Descripción"
					/>
				</Form.Control>
				{errors[FIELDS_FORM.DESCRIPTION] && (
					<Form.Message className="mt-1 text-red-600">{errors[FIELDS_FORM.DESCRIPTION]?.message}</Form.Message>
				)}
			</Form.Field>

			<GCInput
				formFieldName={FIELDS_FORM.METACRITIC_SCORE}
				register={register(FIELDS_FORM.METACRITIC_SCORE, { valueAsNumber: true })}
				error={errors[FIELDS_FORM.METACRITIC_SCORE]}
				label="Metacritic Score"
				type="number"
				placeholder="0"
			>
				<StarSVG className={SVG_CLASS} />
			</GCInput>

			<GCInput
				formFieldName={FIELDS_FORM.RELEASE_DATE}
				register={register(FIELDS_FORM.RELEASE_DATE, {
					valueAsDate: true
				})}
				error={errors[FIELDS_FORM.RELEASE_DATE]}
				label="Fecha de lanzamiento"
				type="date"
				placeholder="Fecha de lanzamiento"
			>
				<CalendarSVG className={SVG_CLASS} />
			</GCInput>

			<GenreCheckboxGroup
				name={FIELDS_FORM.GENRE_IDS}
				label="Géneros"
				value={watch(FIELDS_FORM.GENRE_IDS) || []}
				onChange={(value) => setValue(FIELDS_FORM.GENRE_IDS, value, { shouldValidate: true })}
				error={errors[FIELDS_FORM.GENRE_IDS]?.message?.toString()}
			/>

			<Form.Field name={FIELDS_FORM.IMAGE_URL} className="space-y-2">
				<Form.Label htmlFor={FIELDS_FORM.IMAGE_URL}>Imagen</Form.Label>
				<Form.Control asChild>
					<input
						className="w-full border border-zinc-600 rounded-lg py-2 px-2"
						id={FIELDS_FORM.IMAGE_URL}
						type="file"
						{...register(FIELDS_FORM.IMAGE_URL)}
						placeholder="Seleccione una imagen"
						accept="image/*"
					/>
				</Form.Control>
				{errors[FIELDS_FORM.IMAGE_URL] && (
					<Form.Message className="mt-1 text-red-600">{errors[FIELDS_FORM.IMAGE_URL]?.message}</Form.Message>
				)}
			</Form.Field>

			<Form.Submit asChild className="mt-3">
				<GCButton theme="primary">Crear</GCButton>
			</Form.Submit>
		</Form.Root>
	)
}
