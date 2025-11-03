import { GCSearchBar } from '@/components/GCgenerics'
import { ElementSlider } from '@/components/GCgenerics/ElementSlider'

export function LibraryPage() {
	const games = new Array(Math.floor(Math.random() * 15) + 2).fill(null)
	return (
		<>
			<header className="w-[380px] mb-10">
				<GCSearchBar placeholder="Start searching..." className="w-full!" />
			</header>

			<main>
				<ElementSlider elements={games} titleName="Your Library" />
			</main>
		</>
	)
}
