import type { GameModel } from '@/types'
import { Heading } from '@radix-ui/themes'
import { useCallback, useRef } from 'react'
import { GameCard } from '../game'
import { ScrollBarSlider } from './ScrollbarSlider'

interface ElementSliderProps {
	elements: GameModel[]
	titleName?: string
	className?: string
	pixelMovement?: number
	removeHeadings?: boolean
}
export function ElementSlider({
	className,
	pixelMovement = 200,
	removeHeadings = false,
	elements,
	titleName
}: ElementSliderProps) {
	const scrollbarRef = useRef<HTMLSpanElement>(null)

	const handleScroll = useCallback((pos: 'left' | 'right') => {
		if (!scrollbarRef.current) return

		scrollbarRef.current.scrollBy({
			behavior: 'smooth',
			left: pos === 'right' ? pixelMovement : -pixelMovement
		})
	}, [])

	return (
		<article className={`flex flex-col gap-2.5 ${className}`}>
			{!removeHeadings && (
				<span className="flex items-center justify-between">
					<Heading as="h4">{titleName ?? 'No category name'}</Heading>
					<ScrollBarSlider leftArrow={() => handleScroll('left')} rightArrow={() => handleScroll('right')} />
				</span>
			)}

			<section
				ref={scrollbarRef}
				className="no-scrollbars w-full grid grid-flow-col gap-5 auto-cols-max grid-rows-2 overflow-x-auto"
			>
				{elements.map((game, idx) => {
					return <GameCard key={game?.id ?? idx} game={game} />
				})}
			</section>
		</article>
	)
}
