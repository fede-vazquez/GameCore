interface SaluteProps {
	title: string
	paragraph: string
}

export function SaludationText({ title, paragraph }: SaluteProps) {
	return (
		<span className="flex flex-col mb-2">
			<h4 className="text-xl font-semibold">{title}</h4>
			<p className="text-neutral-400">{paragraph}</p>
		</span>
	)
}
