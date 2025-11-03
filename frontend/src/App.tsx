import { Route, Switch } from 'wouter'
import { AsideBar } from './components/asidebar'
import { LibraryPage } from './pages/library/libraryPage'

export function App() {
	return (
		<main className="flex flex-row w-dvw h-dvh overflow-x-hidden text-primaryWhite bg-darkBG ">
			<AsideBar />
			<article className="pt-2.5 w-full h-full px-3">
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
