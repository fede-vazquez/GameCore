import { Route, Switch } from 'wouter'
import { AsideBar } from './components/asidebar'
import { LibraryPage } from './pages/library/libraryPage'

export function App() {
	return (
		<main className="flex flex-row w-screen h-dvh overflow-x-auto text-primaryWhite bg-darkBG ">
			<AsideBar />
			<article className="grow ml-[225px] overflow-x-hidden pt-2.5 h-full px-10">
				<Switch>
					<Route path="/library" nest>
						<Route path="/" component={LibraryPage} />
					</Route>

					<Route>404</Route>
				</Switch>
			</article>
		</main>
	)
}
