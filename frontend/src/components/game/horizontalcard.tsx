import type { GameModel } from '@/models'
import { GCButton } from '../GCgenerics'
import { DiscountBanner } from './discount'

interface HorizontalCardProps {
	game: Pick<GameModel, 'title' | 'id' | 'description' | 'price' | 'imageUrl'>

	discountPercentage?: number
	className?: string
}

export function HorizontalCard({ className, game: g, discountPercentage }: HorizontalCardProps) {
	return (
		<section className="rounded-md bg-neutral-900">
			<div className="aspect-video max-w-[225px] min-w-[200px] rounded-t-lg overflow-hidden select-none">
				<img
					draggable={false}
					src={g.imageUrl}
					alt={`Image of the game: ${g.title}`}
					className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
				/>
			</div>
			<span className="flex flex-col py-2 gap-1">
				<div className="flex flex-col px-4">
					<h5 className="font-semibold">{g.title}</h5>
					<p className="text-neutral-400">Role, action, playful idk</p>
				</div>

				<div className="px-4 flex items-center justify-between">
					<GCButton theme="primary" className="px-2! py-1!">
						More details
					</GCButton>
					<DiscountBanner price={g.price} dsPer={discountPercentage} />
				</div>
			</span>
		</section>
	)
}
