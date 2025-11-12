import { GCButton } from '@/components/GCgenerics'
import { Link } from 'wouter'

export function Hero() {
	return (
		<section className="bg-[url('/hero_image.jpg')] bg-cover bg-no-repeat bg-top md:bg-bottom h-screen md:h-[70vh]">
			<div
				className="w-full md:max-w-xl flex flex-col justify-end md:justify-end h-full p-4 md:p-10 gap-5 bg-linear-to-t from-black
			via-black/70 md:via-black/90 to-transparent md:bg-linear md:bg-linear-to-r"
			>
				<h1 className="text-4xl font-bold">Tu próxima aventura</h1>
				<p className="text-xl">
					Encuentra en <b>GameCore</b> los juegos que buscas al mejor precio
				</p>
				<Link href="/auth">
					<GCButton theme="primary" className="w-full font-bold">
						Iniciar aventura
					</GCButton>
				</Link>
			</div>
		</section>
	)
}
