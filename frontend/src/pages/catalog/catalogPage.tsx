import { HorizontalCard } from '@/components/game'
import { GCDivider, GCSearchBar } from '@/components/GCgenerics'
import { fallbackGame } from '@/utils'
import { FilterDropMenu } from './components'

export function CatalogPage() {
	const game: (typeof fallbackGame)[] = new Array(5).fill(fallbackGame)
	return (
		<main className="flex flex-col gap-4">
			<section className="relative flex justify-between items-center mb-2">
				<h3 className="text-2xl font-semibold">Games Catalog</h3>
				<span className="flex items-center gap-4">
					<GCSearchBar placeholder="Search name" />
					<FilterDropMenu />
				</span>
				<GCDivider className="translate-y-2!" />
			</section>
			<article className="flex flex-wrap justify-center gap-3 lg:justify-start lg:gap-5">
				{game.map((g, i) => {
					return <HorizontalCard game={g} key={i} />
				})}
			</article>
		</main>
	)
}
