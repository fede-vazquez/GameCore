import SalesPerMonth from './components/salesPerMonth/SalesPerMonth'
import GeneralInfo from './components/generalInfo/GeneralInfo'
import { CategoryInfo } from './components'

export function DashboardPage() {
	return (
		<section className="w-full max-w-7xl m-auto flex flex-col justify-center items-center gap-4">
			<article className="w-full p-5">
				<GeneralInfo />
			</article>
			<article className="w-full">
				<SalesPerMonth />
			</article>
			<article className="w-full">
				<CategoryInfo />
			</article>
		</section>
	)
}
