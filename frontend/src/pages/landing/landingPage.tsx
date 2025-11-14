import { GCDivider } from '@/components/GCgenerics'
import { Footer } from '@/components/footer/footer'
import { WHY_USE_IT } from '@/utils'
import { CardItem, GCList, GameShowcase, Hero } from './components'
import CallToAction from './components/CallToAction'

export function LandingPage() {
	return (
		<main className="flex flex-col gap-y-20">
			<Hero />

			<section className="mt-24 relative flex flex-col gap-y-5 ">
				<div
					className="absolute -translate-y-12 h-[calc(100%+48px+48px)] w-full bg-neutral-900"
					style={{ clipPath: 'polygon(0 20%, 100% 0, 100% 80%, 0 100%)' }}
				/>
				<h2 className="relative z-10 text-2xl w-fit mx-auto font-bold text-center">
					¿Por qué usar GameCore?
					<GCDivider className="absolute w-fit mt-1" />
				</h2>
				<GCList
					dataList={WHY_USE_IT}
					type="grid"
					fnMap={(item) => <CardItem title={item.title} description={item.description} />}
				/>
			</section>

			<section className="p-5">
				<GameShowcase />
			</section>

			<CallToAction />

			<Footer />
		</main>
	)
}
