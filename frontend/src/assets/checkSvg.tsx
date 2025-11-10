import type { SVGInterface } from '.'

export function CheckedSVG({ className, onClick, ref }: SVGInterface) {
	return (
		<svg
			onClick={onClick}
			className={className}
			ref={ref}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M5 12l5 5l10 -10" />
		</svg>
	)
}
