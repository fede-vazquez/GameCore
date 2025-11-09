import { AsideMenuButton } from '../asidebar'
import { GCSearchBar } from './SearchBar'

interface HeaderProps {
	className?: string
}

export function GCHeader({ className }: HeaderProps) {
	return (
		<header className={`relative w-full flex gap-4 mb-10 bg-neutral-800 p-2 rounded-t-lg ${className}`}>
			<div className="absolute w-full h-0.5 right-0 bg-neutral-700 bottom-0 translate-y-0.5" />

			<AsideMenuButton />

			<GCSearchBar placeholder="Start searching..." className="w-[380px]" />
		</header>
	)
}
