import { GameCard } from '@/components/game'
import { GCSearchBar } from '@/components/GCgenerics'
import type { GameModel } from '@/types'

export function LibraryPage() {
	return (
		<>
			<header className="w-[380px]">
				<GCSearchBar placeholder="Start searching..." className="w-full!" />
			</header>

			<article>
				<GameCard game={{} as GameModel} />
			</article>
		</>
	)
}
