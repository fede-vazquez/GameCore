import SalesPerMonthController from './components/salesPerMonth/SalesPerMonth'
import SalesDiscountInfoController from './components/salesDiscountInfo/SalesDiscountInfo'
import GeneralInfo from './components/generalInfo/GeneralInfo'

export function DashboardPage() {
	return (
		<section className="w-full max-w-7xl m-auto flex flex-col justify-center items-center gap-4">
			<article className="w-full p-5">
				<GeneralInfo />
			</article>
			<div className="w-full flex flex-col lg:flex-row gap-4">
				<article className="w-full">
					<SalesPerMonthController />
				</article>
				<article className="w-full p-5">
					<SalesDiscountInfoController />
				</article>
			</div>
		</section>
	)
}
