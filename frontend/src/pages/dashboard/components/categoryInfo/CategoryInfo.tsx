import { useEffect, useState } from 'react'
import { BestSellingGames } from '../bestSellingGames/BestSellingGames'

export function CategoryInfo() {
	const [category, setCategory] = useState('' as string)
	const [categories, setCategories] = useState([] as string[])

	const handleChangeCategory = (category: string) => {
		setCategory(category)
	}

	useEffect(() => {
		// Mock de llamada a la api
		const resultadoApi = 'Acción'
		setCategory(resultadoApi)
		setCategories(['Acción', 'Aventura', 'Deportes', 'Estrategia', 'Juegos de rol'])
	}, [])

	if (categories.length === 0) {
		return <p>No hay datos</p>
	}

	return (
		<section>
			<div className="p-3">
				<label className="text-2xl">
					Información de la categoría:
					<select className="ml-3" value={category} onChange={(e) => handleChangeCategory(e.target.value)}>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</label>
			</div>
			<article>
				<h2 className="text-2xl font-bold mb-4 text-center">Juegos más vendidos</h2>
				<BestSellingGames category={category} />
			</article>
		</section>
	)
}
