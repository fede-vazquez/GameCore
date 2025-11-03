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

export function GameCard({ game, className }: gameCardProps) {
	const testing = fallback

	return (
		<article className={`${className}`}>
			<img
				src={testing.imageUrl}
				alt={`Image of the game: ${testing.title}`}
				className="aspect-2/3 w-[200px] object-cover rounded-lg"
			/>
			<span>
				<h4 className="font-bold tracking-wide ">{testing.title}</h4>
				<p className="text-zinc-700">{numberParser(testing.price)}</p>
			</span>
		</article>
	)
}
