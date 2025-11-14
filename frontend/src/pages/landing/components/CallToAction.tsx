import { GCButton } from '@/components/GCgenerics'
import { Link } from 'wouter'

export default function CallToAction() {
	return (
		<section className="bg-[url('/call_to_action.png')] bg-cover bg-no-repeat bg-top h-screen max-h-[400px] lg:max-h-screen md:bg-auto md:bg-right md:h-[70vh] shadow-lg shadow-neutral-800">
			<div
				className="w-full md:max-w-xl flex flex-col justify-end md:justify-center h-full p-4 md:p-10 gap-5 bg-linear-to-t from-black
			via-black/70 md:via-black/90 to-transparent md:bg-linear md:bg-linear-to-r"
			>
				<h2 className="text-2xl font-bold">¿Listo/a para tu nueva aventura?</h2>
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
