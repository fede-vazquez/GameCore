import type { GameModel } from '@/models'
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

	const isDragged = useRef<boolean>(false)
	const startX = useRef<number>(0)
	const scrollPos = useRef<number>(0)

	const handleScroll = useCallback((pos: 'left' | 'right') => {
		if (!scrollbarRef.current) return

		scrollbarRef.current.scrollBy({
			behavior: 'smooth',
			left: pos === 'right' ? pixelMovement : -pixelMovement
		})
	}, [])

	return (
		<article className={`flex flex-col gap-2.5 relative ${className}`}>
			{!removeHeadings && (
				<>
					<span className="flex items-center justify-between">
						<Heading as="h4">{titleName ?? 'No category name'}</Heading>
						<ScrollBarSlider
							className="z-10"
							leftArrow={() => handleScroll('left')}
							rightArrow={() => handleScroll('right')}
						/>
					</span>
					<div
						className='after:content-[""] after:w-full after:h-0.5 after:absolute after:top-7 after:translate-y-1 after:rounded-md
					after:bg-linear-to-r after:from-neutral-800 after:via-neutral-600 after:to-neutral-800'
					/>
				</>
			)}

			{/* lo saque de internet y lo adapte, refactorizar esto si hay tiempo */}
			<section
				ref={scrollbarRef}
				className={`no-scrollbars bg-neutral-900 px-2 py-1 rounded-xl w-full flex flex-nowrap *:shrink-0! gap-1 overflow-x-auto ${!elements.length && 'py-12!'}`}
				onMouseDown={(e) => {
					isDragged.current = true
					startX.current = e.pageX - (scrollbarRef.current?.offsetLeft ?? 0)
					scrollPos.current = scrollbarRef.current?.scrollLeft ?? 0
				}}
				onMouseMove={(e) => {
					if (!isDragged.current || !scrollbarRef.current) return
					e.preventDefault()
					const x = e.pageX - scrollbarRef.current.offsetLeft
					const walk = (x - startX.current) * 1 //scroll-fast
					scrollbarRef.current.scrollLeft = scrollPos.current - walk
				}}
				onMouseUp={() => (isDragged.current = false)}
				onMouseLeave={() => (isDragged.current = false)}
			>
				{elements.length ? (
					elements.map((game, idx) => {
						return <GameCard key={game?.id ?? idx} game={game} />
					})
				) : (
					<span className="flex flex-col gap-2 grow justify-center items-center">
						<h3 className="content-center text-center w-full h-full text-xl font-semibold text-neutral-300 flex justify-center items-center">
							No games yet :C
						</h3>
						<p className="text-neutral-500">You must be new here. Use the Searchbar at the top, its free!</p>
					</span>
				)}
			</section>
		</article>
	)
}
