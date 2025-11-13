import type { GameModel } from '@/models'
import { useLocation } from 'wouter'
import { GCSkeleton } from '../GCgenerics'
import { DiscountBanner } from './discount'

interface gameCardProps {
	game: Pick<GameModel, 'title' | 'id' | 'description' | 'price' | 'imageUrl'>

	classImg?: string
	classPrice?: string
	discountPercentage?: number
	className?: string
	removeOldPrice?: boolean
}

export function GameCard({
	game,
	discountPercentage,
	className,
	classImg,
	classPrice,
	removeOldPrice = false
}: gameCardProps) {
	const [_, navigate] = useLocation()

	return (
		<article title={game.title} className={`${className} transition-colors hover:bg-black/20 rounded-lg p-2`}>
			<div
				onClick={() => navigate(`/games/${game.id}`)}
				className={`aspect-2/3 w-[200px] rounded-lg overflow-hidden select-none ${classImg}`}
			>
				{game?.imageUrl ? (
					<img
						draggable={false}
						src={game.imageUrl}
						alt={`Image of the game: ${game.title}`}
						className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
					/>
				) : (
					<GCSkeleton className="w-full h-full" />
				)}
			</div>
			<div className="w-full p-1 pt-1 min-w-0">
				<h4 className={`font-bold tracking-wide text-sm ${classImg} truncate`}>{game.title}</h4>
				<span className={`flex flex-row text-sm gap-x-4 items-center ${classPrice}`}>
					<DiscountBanner dsPer={discountPercentage} price={game.price} removeOldPrice={removeOldPrice} />
				</span>
			</div>
		</article>
	)
}
