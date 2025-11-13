import type { GameModel } from '@/models'
import { useLocation } from 'wouter'
import { GCButton, GCSkeleton } from '../GCgenerics'
import { DiscountBanner } from './discount'

interface gameSideCardProps {
	game: Pick<GameModel, 'title' | 'id' | 'imageUrl'> | undefined
	className?: string
	addPrice?: { discount: number; price: number }
}

export function GameSideCard({ game, className, addPrice }: gameSideCardProps) {
	const [_, navigate] = useLocation()

	return (
		<span className={`flex flex-row max-h-32 ${className}`}>
			{game?.imageUrl ? (
				<img
					src={game.imageUrl}
					alt={`Image of the game: ${game.title}`}
					className="aspect-2/3 w-20 object-cover rounded-lg"
				/>
			) : (
				<GCSkeleton className="w-20 aspect-2/3" />
			)}

			<span className="flex flex-col justify-center items-start gap-y-1 pl-2">
				<h4 title={game?.title} className="font-semibold text-sm text-wrap truncate">
					{game?.title}
				</h4>

				<GCButton
					theme="ghost"
					className="text-neutral-200! px-2! py-1!"
					onClick={() => navigate(`/games/${game?.id}`)}
				>
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
