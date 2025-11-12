import { HorizontalCard } from '@/components/game'
import type { GameModel } from '@/models'
import { useState } from 'react'
import { useEffect } from 'react'
import { GCList } from '../GCList'
import { Link } from 'wouter'
import { GCButton } from '@/components/GCgenerics'

export default function GameList({ fetchUrl }: { fetchUrl: string }) {
	const [data, setData] = useState<
		{ game: Pick<GameModel, 'id' | 'title' | 'description' | 'price' | 'imageUrl'>; discountPercentage: number }[]
	>([])

	useEffect(() => {
		// mock data
		const mockData = [
			{
				game: {
					id: 1,
					title: 'Game 1',
					description: 'Description 1',
					price: 10,
					imageUrl: '/fallback_image.png'
				},
				discountPercentage: 10
			},
			{
				game: {
					id: 2,
					title: 'Game 2',
					description: 'Description 2',
					price: 20,
					imageUrl: '/fallback_image.png'
				},
				discountPercentage: 20
			},
			{
				game: {
					id: 3,
					title: 'Game 3',
					description: 'Description 3',
					price: 30,
					imageUrl: '/fallback_image.png'
				},
				discountPercentage: 30
			},
			{
				game: {
					id: 4,
					title: 'Game 4',
					description: 'Description 4',
					price: 40,
					imageUrl: '/fallback_image.png'
				},
				discountPercentage: 40
			},
			{
				game: {
					id: 5,
					title: 'Game 5',
					description: 'Description 5',
					price: 50,
					imageUrl: '/fallback_image.png'
				},
				discountPercentage: 50
			}
		]

		setData(mockData)
	}, [fetchUrl])

	return (
		<>
			<GCList
				dataList={data.map((game) => ({ ...game.game, discountPercentage: game.discountPercentage }))}
				mode="horizontal"
				type="grid"
				fnMap={(game) => <HorizontalCard key={game.id} game={game} discountPercentage={game.discountPercentage} />}
			/>
			<Link href="/games" className="flex justify-center">
				<GCButton theme="primary" className="w-full m-4 max-w-2xl">
					... Ver más
				</GCButton>
			</Link>
		</>
	)
}
