import { LIST_OF_GENRES_DTO } from '@/utils/constants'
import { Form } from 'radix-ui'

interface GenreCheckboxGroupProps {
	name: string
	label: string
	value?: number[]
	onChange: (value: number[]) => void
	error?: string
}

export const GenreCheckboxGroup = ({ name, label, value = [], onChange, error }: GenreCheckboxGroupProps) => {
	const handleGenreChange = (genreId: number, isChecked: boolean) => {
		const newGenres = isChecked ? [...value, genreId] : value.filter((id) => id !== genreId)
		onChange(newGenres)
	}

	return (
		<Form.Field name={name} className="space-y-2">
			<Form.Label className="text-zinc-300 font-semibold">{label}</Form.Label>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
				{LIST_OF_GENRES_DTO.map((genre) => (
					<div key={genre.id} className="flex items-center">
						<input
							type="checkbox"
							id={`${name}-${genre.id}`}
							checked={value.includes(genre.id)}
							onChange={(e) => handleGenreChange(genre.id, e.target.checked)}
							className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
						/>
						<label htmlFor={`${name}-${genre.id}`} className="ml-2 block text-sm text-gray-300">
							{genre.name}
						</label>
					</div>
				))}
			</div>
			{error && <span className="mt-1 text-sm text-red-600">{error}</span>}
		</Form.Field>
	)
}
