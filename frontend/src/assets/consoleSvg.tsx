import type { SVGInterface } from './types'

export function ConsoleSVG({ className, ref }: SVGInterface) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			ref={ref}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M8 9l3 3l-3 3" />
			<path d="M13 15h3" />
			<path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
		</svg>
	)
}
