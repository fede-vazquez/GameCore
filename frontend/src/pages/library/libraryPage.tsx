import { AsideMenuButton } from '@/components/asidebar'
import { GCSearchBar } from '@/components/GCgenerics'
import { ElementSlider } from '@/components/GCgenerics/ElementSlider'
import { useGlobalContext } from '@/context'
import { useLocation } from 'wouter'

export function LibraryPage() {
	const { clientUser } = useGlobalContext()
	const [_, setNavigation] = useLocation()

	// if (!clientUser?.Id) return setNavigation('/auth')

	const games = new Array(Math.floor(Math.random() * 5) + 5).fill(null)
	return (
		<>
			<header className="relative w-full flex gap-4 mb-10 bg-neutral-800 p-2 rounded-t-lg">
				<div className="absolute w-full h-0.5 right-0 bg-neutral-700 bottom-0 translate-y-0.5" />

				<AsideMenuButton />

				<GCSearchBar
					placeholder="Start searching..."
					className="w-[380px] border border-zinc-700 *:text-primaryWhite! *:placeholder:text-neutral-400! bg-neutral-900! "
				/>
			</header>

			<main>
				<ElementSlider elements={games} titleName="Your Library" />
			</main>
		</>
	)
}
