import { useMutation } from '@tanstack/react-query'
import { makeApiCall } from '@/services/apiCall'
import { GameForm } from './components'
import type { GameFormData } from './components/GameFormTypes'

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

export function CreateGamePage() {
	const {
		mutate: createGame,
		isPending: isSubmitting,
		isError,
		isSuccess,
		error
	} = useMutation({
		mutationFn: async (formData: GameFormData) => {
			const apiData: GameCreateDTO = {
				title: formData.title,
				description: formData.description,
				price: formData.price,
				releaseDate: formData.releaseDate.toISOString(),
				developerId: Number(formData.developerId),
				imageUrl: typeof formData.imageUrl === 'string' ? formData.imageUrl : formData.imageUrl?.[0]?.name || '',
				isActive: true,
				genreIds: formData.genreIds,
				metacriticScore: formData.metacriticScore
			}

			return await makeApiCall<GameCreateDTO>({
				endpoint: '/Admin/games',
				httpMethod: 'POST',
				body: { ...apiData }
			})
		}
	})

	const handleSubmit = async (formData: GameFormData) => {
		createGame(formData, {
			onSuccess: (data) => {
				console.log(data)
			},
			onError: (error) => {
				console.error('Error al crear el juego:', error)
			}
		})
	}

	return (
		<main className="container mx-auto px-4 py-8">
			<GameForm
				onSubmit={handleSubmit}
				isSubmitting={isSubmitting}
				isError={isError}
				isSuccess={isSuccess}
				error={error}
				submitButtonText="Crear Juego"
				title="NUEVO JUEGO"
			/>
		</main>
	)
}
