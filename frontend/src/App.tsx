import { Route, Switch } from 'wouter'
import { AsideBar } from './components/asidebar'
import { AuthPage } from './pages/auth/authPage'
import { LibraryPage } from './pages/library/libraryPage'

export function App() {
	return (
		<main className="w-screen h-dvh overflow-x-hidden text-primaryWhite bg-darkBG ">
			<Switch>
				<Route path="/auth" component={AuthPage} />

				<Route>
					<AsideBar />
					<article className="grow ml-[225px] pt-2.5 h-full px-10">
						<Route path="/library" nest>
							<Route path="/" component={LibraryPage} />
						</Route>
					</article>
				</Route>
			</Switch>
		</main>
	)
}
