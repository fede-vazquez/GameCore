import { WHY_USE_IT } from '@/utils'
import { Hero, GCList } from './components'
import { CardItem } from './components/CardItem'
import { GCDivider } from '@/components/GCgenerics'

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
		</>
	)
}
