import { useEffect, useState } from 'react'
import { BestSellingGames } from '../bestSellingGames/BestSellingGames'
import { LatestGamesAdded } from '../listInfo/LatestGamesAdded'
import { LIST_OF_GENRES_DTO } from '@/utils'

export function GenreInfo() {
	const [genre, setGenre] = useState('' as string)
	const [genres, setGenres] = useState([] as string[])

	const handleChangeGenre = (genre: string) => {
		setGenre(genre)
	}

	useEffect(() => {
		setGenre(LIST_OF_GENRES_DTO[0].name)
		setGenres(LIST_OF_GENRES_DTO.map((genre) => genre.name))
	}, [])

	if (genres.length === 0) {
		return <p>No hay datos</p>
	}

	return (
		<section>
			<div className="p-3">
				<label className="text-2xl">
					Información del género:
					<select className="ml-3" value={genre} onChange={(e) => handleChangeGenre(e.target.value)}>
						{genres.map((genre) => (
							<option key={genre} value={genre}>
								{genre}
							</option>
						))}
					</select>
				</label>
			</div>

			<section className="w-full flex flex-col lg:flex-row gap-4">
				<div className="w-full">
					<h2 className="text-2xl font-bold mb-4 text-center">Juegos más vendidos</h2>
					<BestSellingGames genre={genre} />
				</div>

				<div className="w-full">
					<h2 className="text-2xl font-bold mb-4 text-center">Ultimos juegos agregados</h2>
					<LatestGamesAdded genre={genre} />
				</div>
			</section>
		</section>
	)
}
