import { GeneralInfo, SalesPerMonth } from './components'
import { GenreInfo } from './components/categoryInfo/GenreInfo'
import { GCButton } from '@/components/GCgenerics'
import { Link } from 'wouter'

export function DashboardPage() {
	return (
		<section className="w-full max-w-7xl m-auto flex flex-col justify-center items-center gap-4">
			<section>
				<Link href="/admin/games/new">
					<GCButton theme="primary" className="w-fit">
						Agregar Juego
					</GCButton>
				</Link>
			</section>
			<article className="w-full p-5">
				<GeneralInfo />
			</article>
			<article className="w-full">
				<SalesPerMonth />
			</article>
			<article className="w-full">
				<GenreInfo />
			</article>
		</section>
	)
}
