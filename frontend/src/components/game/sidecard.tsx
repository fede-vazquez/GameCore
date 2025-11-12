import type { GameModel } from '@/models'
import { GCButton } from '../GCgenerics'
import { DiscountBanner } from './discount'

interface gameSideCardProps {
	game: Pick<GameModel, 'title' | 'id' | 'imageUrl'>
	className?: string
	addPrice?: { discount: number; price: number }
}

export function GameSideCard({ game, className, addPrice }: gameSideCardProps) {
	return (
		<span className={`flex flex-row ${className}`}>
			<img
				src={game.imageUrl}
				alt={`Image of the game: ${game.title}`}
				className="aspect-2/3 w-20 object-cover rounded-lg"
			/>
			<span className="flex flex-col justify-center items-start gap-y-1 pl-2">
				<h4 className="font-semibold text-lg">{game.title}</h4>

				<GCButton theme="ghost" className="text-neutral-200! px-2! py-1!">
					View
				</GCButton>

				{addPrice && (
					<span className="flex flex-row gap-x-2 mt-1">
						<DiscountBanner price={addPrice?.price} dsPer={addPrice.discount} />
					</span>
				)}
			</span>
		</span>
	)
}
