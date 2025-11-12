import { WHY_USE_IT } from '@/utils'
import { Hero, GCList, GameShowcase, CardItem } from './components'
import { GCDivider } from '@/components/GCgenerics'
import { Footer } from '@/components/footer/footer'
import CallToAction from './components/CallToAction'

export function LandingPage() {
	return (
		<>
			<Hero />

			<GCDivider className="static my-20" />

			<section className="p-5">
				<h2 className="text-2xl font-bold">¿Por qué usar GameCore?</h2>
				<GCList
					dataList={WHY_USE_IT}
					type="grid"
					fnMap={(item) => <CardItem title={item.title} description={item.description} />}
				/>
			</section>

			<GCDivider className="static my-20" />

			<section className="p-5">
				<GameShowcase />
			</section>

			<GCDivider className="static my-20" />

			<CallToAction />

			<GCDivider className="static my-20" />

			<Footer />
		</>
	)
}
