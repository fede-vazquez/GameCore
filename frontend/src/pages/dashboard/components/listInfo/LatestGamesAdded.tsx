import { GCList } from '@/components/GCgenerics'
import type { GameModel } from '@/models'
import { useEffect, useState } from 'react'

export function LatestGamesAdded({ category }: { category: string }) {
	const [lastGamesAdded, setLastGamesAdded] = useState<GameModel[]>([])

	useEffect(() => {
		// Mock de llamada a la api
		setLastGamesAdded(dataApi)
	}, [])

	if (lastGamesAdded.length === 0) {
		return <p>No hay datos</p>
	}

	return (
		<article>
			<GCList
				dataList={lastGamesAdded}
				type="list"
				controlDirection="vertical"
				fnMap={(game) => (
					<div
						className="flex gap-2 items-center justify-between"
						aria-label={`nombre: ${game.title} - fecha de agregado: ${game.createdAt.toLocaleDateString()}`}
					>
						<h3 className="font-bold">{game.title}</h3>
						<span>{game.createdAt.toLocaleDateString()}</span>
					</div>
				)}
			/>
		</article>
	)
}

const dataApi: GameModel[] = [
	{
		id: 1,
		title: 'Super Mario',
		description: 'El clásico juego de Nintendo',
		price: 10.99,
		releaseDate: new Date('1985-09-13'),
		imageUrl: 'https://via.placeholder.com/150',
		createdAt: new Date('2023-01-01'),
		deletedAt: new Date('2023-01-01')
	},
	{
		id: 2,
		title: 'The Legend of Zelda',
		description: 'El juego de Super Nintendo',
		price: 19.99,
		releaseDate: new Date('1986-09-21'),
		imageUrl: 'https://via.placeholder.com/150',
		createdAt: new Date('2023-01-01'),
		deletedAt: new Date('2023-01-01')
	},
	{
		id: 3,
		title: 'Final Fantasy VII',
		description: 'La entrega número 7 de Final Fantasy',
		price: 39.99,
		releaseDate: new Date('1990-08-31'),
		imageUrl: 'https://via.placeholder.com/150',
		createdAt: new Date('2023-01-01'),
		deletedAt: new Date('2023-01-01')
	},
	{
		id: 4,
		title: 'Final Fantasy VIII',
		description: 'La entrega número 8 de Final Fantasy',
		price: 39.99,
		releaseDate: new Date('1995-08-31'),
		imageUrl: 'https://via.placeholder.com/150',
		createdAt: new Date('2023-01-01'),
		deletedAt: new Date('2023-01-01')
	},
	{
		id: 5,
		title: 'Final Fantasy IX',
		description: 'La entrega número 9 de Final Fantasy',
		price: 39.99,
		releaseDate: new Date('2000-08-31'),
		imageUrl: 'https://via.placeholder.com/150',
		createdAt: new Date('2023-01-01'),
		deletedAt: new Date('2023-01-01')
	}
]
