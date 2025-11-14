import { Suspense, lazy, type ReactNode } from 'react'
import { Redirect, Route, Switch } from 'wouter'
import { AsideBar } from './components/asidebar'
import { GCHeader } from './components/GCgenerics'
import { useGlobalContext } from './context'
import { AuthContextProvider } from './pages/auth/context'
import { CatalogContextProvider } from './pages/catalog/context'

// Lazy load all page components with named exports
const LandingPage = lazy(() =>
	import('./pages/landing/landingPage').then((module) => ({ default: module.LandingPage }))
)
const AuthPage = lazy(() => import('./pages/auth/authPage').then((module) => ({ default: module.AuthPage })))
const CatalogPage = lazy(() =>
	import('./pages/catalog/catalogPage').then((module) => ({ default: module.CatalogPage }))
)
const GamePage = lazy(() => import('./pages/game/gamePage').then((module) => ({ default: module.GamePage })))
const LibraryPage = lazy(() =>
	import('./pages/library/libraryPage').then((module) => ({ default: module.LibraryPage }))
)
const DashboardPage = lazy(() =>
	import('./pages/dashboard/dashboardPage').then((module) => ({ default: module.DashboardPage }))
)
const CreateGamePage = lazy(() =>
	import('./pages/gameForm/createGamePage').then((module) => ({ default: module.CreateGamePage }))
)

// Fallback component for Suspense
const LoadingFallback = () => (
	<div className="flex items-center justify-center w-full h-screen">
		<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
	</div>
)

export const App = function App() {
	const { clientUser } = useGlobalContext()
	console.log(clientUser, clientUser?.rol === 'Admin')
	return (
		<main className="w-screen h-screen overflow-x-hidden text-primaryWhite bg-darkBG">
			<Suspense fallback={<LoadingFallback />}>
				<Switch>
					<Route path="/" component={() => <LandingPage />} />
					<Route
						path="/auth"
						component={() => (
							<AuthContextProvider>
								<AuthPage />
							</AuthContextProvider>
						)}
					/>

					<Route
						path="/admin/games/new"
						component={() => (clientUser?.rol === 'Admin' ? <CreateGamePage /> : <Redirect href="/auth" />)}
					/>

					<Route
						path="/library"
						component={() =>
							clientUser?.id ? <AsideBarWrapper children={<LibraryPage />} /> : <Redirect href="/auth" />
						}
					/>

					<Route
						path="/admin/dashboard"
						component={() =>
							clientUser?.rol === 'Admin' ? <AsideBarWrapper children={<DashboardPage />} /> : <Redirect href="/auth" />
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
			</Suspense>
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
