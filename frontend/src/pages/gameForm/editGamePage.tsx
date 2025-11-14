import { useMutation, useQuery } from '@tanstack/react-query'
import { makeApiCall } from '@/services/apiCall'
import { GameForm } from './components'
import type { GameFormData } from './components/GameFormTypes'
import { useParams } from 'wouter'
import type { GetGameDTO } from '@/models'

export interface GameUpdateDTO {
	id: string
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

export function EditGamePage() {
	const { id } = useParams<{ id: string }>()

	const { data: gameData, isLoading } = useQuery<GetGameDTO>({
		queryKey: ['game', id],
		queryFn: async () => {
			try {
				const data = await makeApiCall<GetGameDTO>({
					endpoint: '/Games/{id}',
					httpMethod: 'GET',
					opts: {
						parameter: id
					}
				})
				return data
			} catch (err) {
				console.error('Error in queryFn:', err)
				throw err
			}
		},
		enabled: !!id,
		retry: false
	})

	const {
		mutate: updateGame,
		isPending: isSubmitting,
		isError,
		isSuccess,
		error: mutationError
	} = useMutation({
		mutationFn: async (formData: GameFormData) => {
			const apiData: Partial<GameUpdateDTO> = {}

			apiData.title = formData.title
			apiData.description = formData.description
			apiData.price = formData.price
			apiData.releaseDate = formData.releaseDate.toISOString()
			const newImageUrl = formData.imageUrl?.[0]?.name
			apiData.imageUrl = newImageUrl
			apiData.genreIds = formData.genreIds
			apiData.metacriticScore = formData.metacriticScore
			apiData.developerId = Number(formData.developerId)
			apiData.isActive = true

			return await makeApiCall<GameUpdateDTO>({
				endpoint: '/Admin/games/{id}',
				httpMethod: 'PUT',
				opts: {
					parameter: id
				},
				body: apiData
			})
		},
		onSuccess: (data) => {
			console.log('Game updated successfully: ', data)
		},
		onError: (error) => {
			console.error('Error updating game:', error)
		}
	})

	const handleSubmit = (formData: GameFormData) => {
		updateGame(formData)
	}

	if (isLoading) {
		return <div className="text-center p-8">Cargando juego...</div>
	}

	if (!gameData) {
		return <div className="text-center p-8">Juego no encontrado</div>
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<GameForm
				key={gameData.id}
				defaultValues={{
					title: gameData.title,
					description: gameData.description,
					price: gameData.price,
					metacriticScore: gameData.metacriticScore ?? 0,
					releaseDate: new Date(gameData.releaseDate.toString()),
					genreIds: Array.isArray(gameData.genres) ? gameData.genres.map((g: any) => g.id) : [],
					developerId: String(gameData.developer.id)
				}}
				onSubmit={handleSubmit}
				isSubmitting={isSubmitting}
				isError={isError}
				isSuccess={isSuccess}
				error={mutationError}
				title="Editar juego"
				submitButtonText="Actualizar juego"
			/>
		</div>
	)
}

export default EditGamePage
