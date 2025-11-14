export function CardItem({ title, description }: { title: string; description: string }) {
	return (
		<div className="flex flex-col items-center  p-4 sm:w-[400px] mx-auto md:mx-0 md:w-full bg-neutral-800 border border-neutral-600 text-center rounded-xl h-full">
			<h3 className="text-xl font-bold pb-3">{title}</h3>
			<p className="text-md">{description}</p>
		</div>
	)
}
