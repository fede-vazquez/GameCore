export function CardItem({ title, description }: { title: string; description: string }) {
	return (
		<div className="flex flex-col p-4 bg-neutral-800 border border-neutral-600 text-center rounded-xl h-full">
			<h3 className="text-xl font-bold pb-3">{title}</h3>
			<p className="text-md">{description}</p>
		</div>
	)
}
