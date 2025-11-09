export function GCDivider({ className }: { className?: string }) {
	return (
		<div
			className={`content-[""] w-full h-0.5 absolute top-7 translate-y-1 rounded-md
					bg-linear-to-r from-neutral-800 via-neutral-600 to-neutral-800 ${className}`}
		/>
	)
}
