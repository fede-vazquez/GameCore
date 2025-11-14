import type { GetGameDTO } from '@/models'
import { useLocation } from 'wouter'
import { GCButton, GCSkeleton } from '../GCgenerics'
import { DiscountBanner } from './discount'

interface HorizontalCardProps {
	game: Pick<GetGameDTO, 'title' | 'id' | 'description' | 'price' | 'imageUrl' | 'genres'>

	discountPercentage?: number
	className?: string
	isPending?: boolean
}

export function HorizontalCard({ className, game: g, discountPercentage, isPending = false }: HorizontalCardProps) {
	const [_, navigate] = useLocation()

	if (isPending) return <GCSkeleton className="max-w-[225px] w-[200px] h-[230px]" />

	return (
		<section className={`rounded-md bg-neutral-900 ${className} border border-neutral-700 w-fit`}>
			<div className="aspect-video max-w-[225px] min-w-[200px] rounded-t-lg overflow-hidden select-none">
				<img
					draggable={false}
					src={g.imageUrl}
					alt={`Image of the game: ${g.title}`}
					className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
				/>
			</div>
			<ul className="flex justify-evenly gap-2 max-w-[225px] mt-1">
				{g.genres.map((e) => {
					return (
						<li title={e.name} key={e.id} className="text-sm text-neutral-400 truncate">
							{e.name}
						</li>
					)
				})}
			</ul>
			<span className="flex flex-col py-2 gap-1">
				<div className="flex flex-col px-2 overflow-x-hidden">
					<h5 className="font-semibold truncate max-w-[200px]!" title={g.title}>
						{g.title}
					</h5>
				</div>
				<div className="px-2 flex items-center justify-between">
					<GCButton theme="primary" className="px-2! py-1!" onClick={() => navigate(`/games/${g.id}`)}>
						View
					</GCButton>
					<DiscountBanner price={g.price} dsPer={discountPercentage} />
				</div>
			</span>
		</section>
	)
}
