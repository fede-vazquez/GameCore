import { ConsoleSVG, ControllerSVG, StoreSVG, UserSVG } from '@/assets'
import type { GameModel } from '@/models'
import type { ReactElement } from 'react'
import { Link } from 'wouter'
import { GameSideCard } from '../game'
import { GCButton } from '../GCgenerics'

export function AsideBar() {
	return (
		<>
			<style>
				{`
				#shadowTest{
					background: linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
				}
				`}
			</style>

			<aside className="fixed flex flex-col overflow-clip h-full w-[225px] bg-darkFG gap-y-5 rounded-r-xl divide-y-2 divide-neutral-700 divide-solid *:px-2">
				<header className="cursor-pointer max-w-full">
					<Link href="/">
						<img src="generic_logo.png" className="aspect-square object-contain w-full h-20" />
					</Link>
				</header>
				<main className="flex flex-col flex-1 gap-y-4 overflow-hidden px-0!">
					<ul className="flex flex-col gap-y-2.5 px-2!">
						<ListElement svg={<StoreSVG />} name="Store" />
						<ListElement svg={<ControllerSVG />} name="Games" />
						<ListElement svg={<ConsoleSVG />} name="Admin" />
					</ul>

					<span className="flex flex-col flex-1 overflow-hidden">
						{/* or just use css... */}
						<div className="flex items-center">
							<div className="grow border-t border-neutral-800"></div>
							<h4 className="shrink mx-1 font-semibold">Installed Games</h4>
							<div className="grow border-t border-neutral-800"></div>
						</div>

						<div className="flex flex-col mt-2 overflow-y-auto *">
							{new Array(Math.floor(Math.random() * 10) + 1).fill(null).map((_, id) => {
								return <GameSideCard key={id} className="hover:bg-neutral-900/70 pl-2 py-2" game={{} as GameModel} />
							})}
						</div>
					</span>
				</main>
				<footer className="flex justify-center items-center pb-4 relative">
					{/* might delete this lmao */}
					<div id="shadowTest" className="absolute w-full h-10 -translate-y-full -top-5"></div>
					<GCButton theme="primary" className="flex gap-0.5">
						<UserSVG />
						{Math.random() >= 0.5 ? 'Profile' : 'Log In'}
					</GCButton>
				</footer>
			</aside>
		</>
	)
}

// create another file (if necessary!)
function ListElement({ svg, name }: { svg: ReactElement; name: string }) {
	return (
		<li
			className="flex flex-row items-center pl-2 py-1.5 w-full gap-3 rounded-lg 
			cursor-pointer hover:bg-primaryBlue transition-colors duration-75"
		>
			{svg}
			<span className="">{name}</span>
		</li>
	)
}
