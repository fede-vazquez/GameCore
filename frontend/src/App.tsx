import { useEffect } from 'react'
import { Route, Switch } from 'wouter'
import { AsideBar } from './components/asidebar'
import { LibraryPage } from './pages/library/libraryPage'
import { makeApiCall } from './services/apiCall'
import { DashboardPage } from './pages/dashboard/dashboardPage'

export function App() {
	useEffect(() => {
		async function test() {
			console.log(await makeApiCall({ endpoint: '/admin/games', httpMethod: 'POST' }))
		}
		test()
	}, [])
	return (
		<main className="flex flex-row w-screen h-dvh overflow-x-auto text-primaryWhite bg-darkBG ">
			<AsideBar />
			<article className="grow ml-[225px] overflow-x-hidden pt-2.5 h-full px-10">
				<Switch>
					<Route path="/library" nest>
						<Route path="/" component={LibraryPage} />
					</Route>

					<Route path="/admin" nest>
						<Route path="/dashboard" component={DashboardPage} />
					</Route>

					<Route>404</Route>
				</Switch>
			</article>
		</main>
	)
}
