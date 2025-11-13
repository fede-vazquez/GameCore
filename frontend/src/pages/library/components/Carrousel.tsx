import { ChevronSVG } from '@/assets'
import type { GameListResponse } from '@/models'
import { Skeleton } from '@radix-ui/themes'
import { useState } from 'react'
import { useLocation } from 'wouter'

interface CarrouselProps {
	data: GameListResponse['items'] | undefined
}

export function Carrousel({ data }: CarrouselProps) {
	const [current, setCurrent] = useState(0)
	const [_, navigate] = useLocation()

	if (!data) return <Skeleton />

	const prevSlide = () => {
		setCurrent((prev) => (prev === 0 ? data.length - 1 : prev - 1))
	}

	const nextSlide = () => {
		setCurrent((prev) => (prev === data.length - 1 ? 0 : prev + 1))
	}

	return (
		<div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg">
			<div
				className="flex transition-transform duration-500 aspect-video"
				style={{ transform: `translateX(-${current * 100}%)` }}
			>
				{data.map((g) => (
					<section
						onClick={() => navigate(`/games/${g.id}`)}
						style={{
							backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url('${g.imageUrl}')`
						}}
						className="cursor-pointer relative rounded-xl flex flex-col h-full shrink-0  w-full bg-no-repeat bg-cover bg-center"
					>
						<span className="flex justify-center w-full mt-10">
							<h4 className="text-xl font-semibold">{g.title}</h4>
						</span>
					</section>
				))}
			</div>

			<button
				onClick={prevSlide}
				className="absolute top-1/2 left-3 -translate-y-1/2 bg-neutral-600/90 hover:bg-neutral-600 cursor-pointer rounded-full p-2"
			>
				<ChevronSVG className="rotate-90" />
			</button>
			<button
				onClick={nextSlide}
				className="absolute top-1/2 right-3 -translate-y-1/2 bg-neutral-600/90 70 hover:bg-neutral-600 cursor-pointer rounded-full p-2"
			>
				<ChevronSVG className="-rotate-90" />
			</button>

			{/* Dots */}
			<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
				{data.map((g, i) => (
					<button
						key={g.id}
						onClick={() => setCurrent(i)}
						className={`w-3 h-3 rounded-full transition-all ${current === i ? 'bg-white' : 'bg-gray-400/50'}`}
					/>
				))}
			</div>
		</div>
	)
}
