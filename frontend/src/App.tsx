import { type ReactNode } from 'react'
import { Redirect, Route, Switch } from 'wouter'
import { AsideBar } from './components/asidebar'
import { GCHeader } from './components/GCgenerics'
import { useGlobalContext } from './context'
import { AuthPage } from './pages/auth/authPage'
import { AuthContextProvider } from './pages/auth/context'
import { CatalogPage } from './pages/catalog/catalogPage'
import { CatalogContextProvider } from './pages/catalog/context'
import { GamePage } from './pages/game/gamePage'
import { LibraryPage } from './pages/library/libraryPage'

export const App = function App() {
	const { clientUser } = useGlobalContext()

	return (
		<main className="w-screen h-screen overflow-x-hidden text-primaryWhite bg-darkBG ">
			<Switch>
				<Route
					path="/auth"
					component={() => (
						<AuthContextProvider>
							<AuthPage />
						</AuthContextProvider>
					)}
				/>

				{/* //TODO: replace with clientUser?.Id */}
				<Route
					path="/library"
					component={() =>
						clientUser?.id ? <AsideBarWrapper children={<LibraryPage />} /> : <Redirect href="/auth" />
					}
				/>

				<Route
					path="/games"
					component={() => (
						<AsideBarWrapper
							children={
								<CatalogContextProvider>
									<CatalogPage />
								</CatalogContextProvider>
							}
						/>
					)}
				/>

				<Route
					path="/games/:id"
					component={() => (
						<AsideBarWrapper>
							<GamePage />
						</AsideBarWrapper>
					)}
				/>

				<Route component={() => <Redirect href="/auth" />} />
			</Switch>
		</main>
	)
}

//! if you have a better idea (like installing react dom) go ahead. do it.
function AsideBarWrapper({ children }: { children: ReactNode }) {
	return (
		<>
			<AsideBar />

			<article className="grow md:ml-[225px] pt-2.5 h-full px-5 lg:px-5 ">
				<GCHeader />
				{children}
			</article>
		</>
	)
}
