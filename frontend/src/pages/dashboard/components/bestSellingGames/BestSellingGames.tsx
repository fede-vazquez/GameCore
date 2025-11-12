import { useEffect, useState } from 'react'
import type { BestSellingGames } from '@/models/dashboard'
import { BestSellingGamesChart } from './BestSellingGamesChart'

export function BestSellingGames({ category }: { category: string }) {
	const [bestSellingGames, setBestSellingGames] = useState<BestSellingGames[]>([])

	useEffect(() => {
		// Mock de llamada a la api
		setBestSellingGames(resultadoApi)
	}, [])

	if (bestSellingGames.length === 0) {
		return <p>No hay datos</p>
	}

	return (
		<>
			<BestSellingGamesChart data={bestSellingGames} />
		</>
	)
}

const resultadoApi = [
	{
		title: 'Stardew Valley',
		totalSales: 10000
	},
	{
		title: 'Stardew Valley 2',
		totalSales: 20000
	},
	{
		title: 'Stardew Valley 3',
		totalSales: 22500
	},
	{
		title: 'Stardew Valley 4',
		totalSales: 20500
	},
	{
		title: 'Stardew Valley 5',
		totalSales: 17500
	}
]
