import { GameCard } from '@/components/game'
import { GCSearchBar } from '@/components/GCgenerics'
import type { GameModel } from '@/types'

export function LibraryPage() {
	return (
		<>
			<header className="w-[380px] mb-10">
				<GCSearchBar placeholder="Start searching..." className="w-full!" />
			</header>

			<article className="w-full grid grid-flow-col gap-5 auto-cols-max auto-rows-max">
				{new Array(Math.floor(Math.random() * 50) + 1).fill(null).map(() => {
					return <GameCard game={{} as GameModel} />
				})}
			</article>
		</>
	)
}
