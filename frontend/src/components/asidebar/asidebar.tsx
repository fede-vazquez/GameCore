import { ConsoleSVG, ControllerSVG, StoreSVG, ThrobberSVG, UserSVG } from '@/assets'
import { useGlobalContext, useLibraryContext, useMenuContext } from '@/context'
import type { GameListResponse, UserModel } from '@/models'
import { makeApiCall } from '@/services/apiCall'
import { QUERY_KEYS } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { useEffect, type ReactElement } from 'react'
import { Link, useLocation } from 'wouter'
import { GameSideCard } from '../game'
import { GCButton } from '../GCgenerics'

export function AsideBar() {
	const { clientUser, setClientUser } = useGlobalContext()
	const { libraryGames, setLibraryGames } = useLibraryContext()
	const { isMenuActive, setIsMenuActive, enabled, setEnabled } = useMenuContext()

	const [location, navigate] = useLocation()

	const { data, isPending } = useQuery({
		queryKey: [QUERY_KEYS.GET_LIBRARY_GAMES],
		queryFn: async () => {
			//this is the worst thing i've done. but it works. i accept changes (no rerenders please).
			try {
				return (await makeApiCall<GameListResponse>({ endpoint: '/Library' }))?.items ?? []
			} catch (error) {
				return []
			}
		},
		refetchOnMount: false,
		enabled: enabled
	})

	useEffect(() => {
		if (!data) return
		setEnabled(false)
		setLibraryGames(data)
	}, [data])

	return (
		<>
			<style>
				{`
				#shadowTest{
					background: linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
				}
				`}
			</style>

			{/* this is the easy way */}
			<div
				className={`after:transition-all after:duration-500 after:content-[""] after:w-screen after:h-screen after:fixed
					after:z-40 after:bg-transparent after:pointer-events-none
					${isMenuActive && 'after:bg-black/30! after:pointer-events-auto!'}`}
				onClick={() => setIsMenuActive(false)}
			/>
			<aside
				className={`-translate-x-full md:translate-0 z-50! transition-all duration-300 fixed flex flex-col overflow-clip h-full w-[225px] 
				bg-darkFG gap-y-5 rounded-r-xl divide-y-2 divide-neutral-700 divide-solid *:px-2
				${isMenuActive && 'translate-0!'}
				`}
			>
				<header className="cursor-pointer max-w-full">
					<Link href="/">
						<img src="/logo.webp" className="aspect-square object-contain w-full h-18 p-2" />
					</Link>
				</header>
				<main className="flex flex-col flex-1 gap-y-4 overflow-hidden px-0!">
					<ul className="flex flex-col gap-y-2.5 px-2!">
						<ListElement href="/games" svg={<StoreSVG />} name="Store" currentLocation={location} />
						<ListElement href="/library" svg={<ControllerSVG />} name="Library" currentLocation={location} />

						{clientUser?.rol === 'Admin' && (
							<ListElement href="/dashboard" svg={<ConsoleSVG />} name="Admin" currentLocation={location} />
						)}
					</ul>

					<span className="flex flex-col flex-1 overflow-hidden">
						{/* or just use css... */}
						<div className="flex items-center">
							<div className="grow border-t border-neutral-800"></div>
							<h4 className="shrink mx-1 font-semibold">Your games</h4>
							<div className="grow border-t border-neutral-800"></div>
						</div>

						<div className="flex flex-col mt-2 overflow-y-auto *">
							{isPending ? (
								<ThrobberSVG className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 animate-spin h-12 w-fit flex grow" />
							) : libraryGames?.length ? (
								libraryGames.map((g) => {
									return <GameSideCard key={g.id} className="hover:bg-neutral-900/70 pl-2 py-2" game={g} />
								})
							) : (
								<p className="w-full text-center absolute top-1/2 -translate-y-1/2 font-semibold text-lg text-zinc-600">
									No games available :C
								</p>
							)}
						</div>
					</span>
				</main>
				<footer className="flex justify-center items-center pb-4 relative">
					{/* might delete this lmao */}
					<div id="shadowTest" className="absolute w-full h-10 -translate-y-full -top-5"></div>
					<Link href="/auth">
						{!clientUser?.id ? (
							<GCButton theme="primary" className="flex gap-0.5" onClick={() => void 0}>
								<UserSVG />
								Log In
							</GCButton>
						) : (
							<GCButton
								theme="ghost"
								className="flex gap-0.5 max-w-[100px]! text-nowrap! px-2! py-1!"
								onClick={() => {
									localStorage.clear()
									setClientUser({} as UserModel)
									navigate(location, { replace: true })
								}}
							>
								Log Out
							</GCButton>
						)}
					</Link>
				</footer>
			</aside>
		</>
	)
}

// create another file (if necessary!)
function ListElement({
	svg,
	name,
	href,
	currentLocation
}: {
	svg: ReactElement
	name: string
	href: string
	currentLocation: string
}) {
	return (
		<Link href={href} className="">
			<li
				className={`flex flex-row items-center pl-2 py-1.5 w-full gap-3 rounded-lg 
			cursor-pointer hover:bg-primaryBlue transition-colors duration-75 ${currentLocation === href && 'bg-neutral-800!'}`}
			>
				{svg}

				<span>{name}</span>
			</li>
		</Link>
	)
}
