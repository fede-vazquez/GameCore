import { useForm } from 'react-hook-form'
import { Form } from 'radix-ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { StarSVG } from '@/assets/starSvg'
import { GenreCheckboxGroup } from './GenreCheckboxGroup'
import { GCButton, GCInput } from '@/components/GCgenerics'
import { CalendarSVG } from '@/assets/calendarSvg'
import { DollarSVG } from '@/assets/dollarSvg'
import { gameFormSchema, FIELDS_FORM, SVG_CLASS, type GameFormData } from './GameFormTypes'
import { SelectDeveloper } from './selectDeveloper'

interface GameFormProps {
	defaultValues?: GameFormData
	onSubmit: (data: GameFormData) => void
	isSubmitting: boolean
	isError: boolean
	isSuccess: boolean
	error: Error | null
	submitButtonText?: string
	title?: string
}

export function GameForm({
	defaultValues,
	onSubmit,
	isSubmitting,
	isError,
	isSuccess,
	error,
	submitButtonText = 'Guardar',
	title
}: GameFormProps) {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		control,
		formState: { errors }
	} = useForm<GameFormData>({
		resolver: zodResolver(gameFormSchema),
		defaultValues: {
			title: '',
			description: '',
			genreIds: [],
			developerId: '',
			...defaultValues
		}
	})

	return (
		<Form.Root onSubmit={handleSubmit(onSubmit)} className="space-y-2 max-w-2xl mx-auto p-6 bg-black rounded-lg shadow">
			{isSubmitting && <p className="text-yellow-500">Cargando...</p>}
			{isError && <p className="text-red-500">Error: {error?.message}</p>}
			{isSuccess && <p className="text-green-500">Operación exitosa</p>}

			<h2 className="text-2xl font-bold text-white text-center">{title}</h2>

			<GCInput
				formFieldName={FIELDS_FORM.TITLE}
				register={register(FIELDS_FORM.TITLE)}
				error={errors[FIELDS_FORM.TITLE]}
				label="Título"
				type="text"
				disableSvgPlaceholder={true}
			/>

			<SelectDeveloper
				label="Desarrollador"
				error={errors[FIELDS_FORM.DEVELOPER_ID]}
				register={register(FIELDS_FORM.DEVELOPER_ID)}
				control={control}
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
				register={register(FIELDS_FORM.RELEASE_DATE, { valueAsDate: true })}
				error={errors[FIELDS_FORM.RELEASE_DATE]}
				label="Fecha de lanzamiento"
				type="date"
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
						accept="image/*"
					/>
				</Form.Control>
				{errors[FIELDS_FORM.IMAGE_URL] && (
					<Form.Message className="mt-1 text-red-600">{errors[FIELDS_FORM.IMAGE_URL]?.message}</Form.Message>
				)}
			</Form.Field>

			<Form.Submit asChild className="mt-3">
				<GCButton theme="primary" disabled={isSubmitting}>
					{submitButtonText}
				</GCButton>
			</Form.Submit>
		</Form.Root>
	)
}
