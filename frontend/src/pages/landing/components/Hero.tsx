import { GCButton } from '@/components/GCgenerics'
import { Link } from 'wouter'

export function Hero() {
	return (
		<section className="relative w-full h-[550px] md:h-[650px] overflow-hidden shadow-lg shadow-sky-400/20">
			<div className="absolute inset-0 bg-[url('/hero_image.jpg')] bg-cover bg-top md:bg-bottom" />

			<div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-black via-black/60 to-transparent" />

			<div className="relative h-full flex flex-col justify-end md:justify-center p-6 md:p-12 max-w-2xl gap-5">
				<h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">Tu próxima aventura</h1>

				<p className="text-lg md:text-2xl text-white/90 drop-shadow">
					Encuentra en <b>GameCore</b> los juegos que buscas al mejor precio.
				</p>

				<Link href="/auth">
					<GCButton theme="ghost" className="w-full md:w-fit font-bold text-lg md:text-xl px-8 py-4">
						Inicia tu adventura
					</GCButton>
				</Link>
			</div>
		</section>
	)
}
