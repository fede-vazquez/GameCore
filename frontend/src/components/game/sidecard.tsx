import type { GameModel } from '@/types'

interface gameSideCardProps {
	game: Pick<GameModel, 'title' | 'id' | 'imageUrl'>
	className?: string
}

const fallback: gameSideCardProps['game'] = {
	title: 'Factorio',
	id: Math.floor(Math.random() * 100),
	imageUrl: './fallback_image.png'
}

export function GameSideCard({ game, className }: gameSideCardProps) {
	const testing = fallback

	return (
		<span className={`flex flex-row ${className}`}>
			<img
				src={testing.imageUrl}
				alt={`Image of the game: ${testing.title}`}
				className="aspect-2/3 w-20 object-cover rounded-lg"
			/>
			<span className="flex flex-col justify-center items-start pl-2">
				<h4 className="font-semibold text-lg">{testing.title}</h4>
				<button className="text-textMedium">View</button>
			</span>
		</span>
	)
}
