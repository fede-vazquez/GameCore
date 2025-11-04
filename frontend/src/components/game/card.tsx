import type { GameModel } from '@/types'
import { numberParser } from '@/utils'

interface gameCardProps {
	game: Pick<GameModel, 'title' | 'id' | 'description' | 'price' | 'imageUrl'>

	discountPercentage?: number
	className?: string
}

const fallback: gameCardProps['game'] = {
	title: 'Factorio',
	id: Math.floor(Math.random() * 100),
	description: 'The factory must grow.',
	price: 17.99,
	imageUrl: './fallback_image.png'
}

export function GameCard({ game, discountPercentage, className }: gameCardProps) {
	const testing = fallback
	const dsPer = Math.random() > 0.8 ? Math.floor(Math.random() * 100) : 0
	const price = numberParser(testing.price)
	return (
		<article className={`${className}`}>
			<img
				src={testing.imageUrl}
				alt={`Image of the game: ${testing.title}`}
				className="aspect-2/3 w-[200px] object-cover rounded-lg"
			/>
			<div className="w-full p-1 pt-1">
				<h4 className="font-bold tracking-wide">{testing.title}</h4>

				<span className="flex flex-row text-sm gap-x-4 items-center">
					{dsPer != 0 ? (
						<>
							<p className="text-center bg-primaryWhite text-neutral-900 px-2 py-1 rounded-md font-bold">{dsPer}%</p>
							<div className="flex gap-x-1.5">
								<p className="text-zinc-500 line-through">{price}</p>
								<p className="text-neutral-200">{numberParser(testing.price - testing.price * (dsPer / 100))}</p>
							</div>
						</>
					) : (
						<p className="text-neutral-200">{price}</p>
					)}
				</span>
			</div>
		</article>
	)
}
