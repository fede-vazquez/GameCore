import type { ReactNode } from 'react'
import { Redirect, Route, Switch } from 'wouter'
import { AsideBar } from './components/asidebar'
import { useGlobalContext } from './context'
import { AuthPage } from './pages/auth/authPage'
import { AuthContextProvider } from './pages/auth/context'
import { LibraryPage } from './pages/library/libraryPage'

export function App() {
	const { clientUser } = useGlobalContext()

	return (
		<main className="w-screen h-dvh overflow-x-hidden text-primaryWhite bg-darkBG ">
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
					component={() => (true ? <AsideBarWrapper children={<LibraryPage />} /> : <Redirect href="/auth" />)}
				/>

				<Route component={() => <>404</>} />
			</Switch>
		</main>
	)
}

//! if you have a better idea (like installing react dom) go ahead. do it.
function AsideBarWrapper({ children }: { children: ReactNode }) {
	return (
		<>
			<AsideBar />
			<article className="grow md:ml-[225px] pt-2.5 h-full mt-3 px-5 lg:px-5 ">{children}</article>
		</>
	)
}
