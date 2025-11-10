import type { SVGInterface } from '.'

export function ThrobberSVG({ className, onClick, ref }: SVGInterface) {
	return (
		<svg
			ref={ref}
			className={className}
			onClick={onClick}
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
			<path d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9" />
			<path d="M17 12a5 5 0 1 0 -5 5" />
		</svg>
	)
}
