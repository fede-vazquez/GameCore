import { ThrobberSVG } from '@/assets'
import { useTransitionError } from '@/hooks'
import type { GameListResponse } from '@/models'
import { makeApiCall } from '@/services/apiCall'
import { debouncer } from '@/utils'
import { useMemo, useState } from 'react'
import { Link } from 'wouter'
import { AsideMenuButton } from '../asidebar'
import { DiscountBanner } from '../game/discount'
import { GCSearchBar } from './SearchBar'
import { GCSkeleton } from './Skeleton'

interface HeaderProps {
	className?: string
}

export function GCHeader({ className }: HeaderProps) {
	const [headerRes, setHeaderRes] = useState<GameListResponse['items']>([])
	const { error, isPending, startTransition } = useTransitionError()

	const debouncedSearch = useMemo(() => {
		return debouncer((e: string) => {
			const value = e ?? ''
			if (value.length === 0) setHeaderRes([])

			if (value.length < 3) return
			startTransition(async () => {
				const data = await makeApiCall<GameListResponse>({ endpoint: '/Games?', opts: { filters: { Name: value } } })
				console.log(data)
				setHeaderRes(data?.items)
			})
		})
	}, [])

	return (
		<header className={`relative w-full flex gap-4 mb-10 bg-neutral-800 p-2 rounded-t-lg ${className}`}>
			<div className="absolute w-full h-0.5 right-0 bg-neutral-700 bottom-0 translate-y-0.5" />

			<AsideMenuButton />

			<GCSearchBar
				placeholder="Start searching..."
				className="w-[380px]"
				onChange={(e) => debouncedSearch(e.currentTarget.value)}
			/>
			<section
				className={`absolute bottom-0 translate-y-full sm:w-[300px] md:w-[380px]  rounded-lg bg-zinc-900 border border-neutral-600 ${!headerRes.length && 'hidden'} z-40`}
			>
				{isPending || error != null ? (
					<span className="w-full flex justify-center items-center h-[100px]! px-2! py-1!">
						<ThrobberSVG className="animate-spin" />
					</span>
				) : (
					headerRes?.map((g) => (
						<Link href={`/games/${g.id}`}>
							<article
								key={g.id}
								className="flex flex-row gap-x-2 w-full cursor-pointer hover:bg-zinc-800 transition-colors px-2 py-1"
							>
								<div className="md:aspect-video shrink-0 w-24 rounded-lg overflow-hidden select-none">
									{g?.imageUrl ? (
										<img
											draggable={false}
											src={g.imageUrl}
											alt={`Portrait image of ${g.title}`}
											className="w-full h-full object-contain md:object-cover transition-all duration-300 hover:scale-110"
										/>
									) : (
										<GCSkeleton className="h-full w-full" />
									)}
								</div>
								<div className="flex flex-col justify-evenly w-full h-[100px]">
									<span className="flex flex-col w-fit justify-evenly md:w-full">
										<h5 title={g.title} className="w-full truncate font-semibold">
											{g.title}
										</h5>
										<span className="flex flex-row gap-x-3">
											<DiscountBanner dsPer={g.discount?.percentageValue ?? 0} price={g.price} removeOldPrice />
										</span>
									</span>
									<ul className="flex-row gap-x-2 hidden md:flex overflow-hidden">
										{g.genres.map(({ name, id }) => (
											<li key={id} className="text-sm text-neutral-400">
												{name}
											</li>
										))}
									</ul>
								</div>
							</article>
						</Link>
					))
				)}
			</section>
		</header>
	)
}
