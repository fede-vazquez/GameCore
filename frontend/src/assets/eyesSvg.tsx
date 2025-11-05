import type { SVGInterface } from '.'

export function EyesClosedSVG({ className, onClick, ref }: SVGInterface) {
	return (
		<svg
			ref={ref}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			onClick={onClick}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4" />
			<path d="M3 15l2.5 -3.8" />
			<path d="M21 14.976l-2.492 -3.776" />
			<path d="M9 17l.5 -4" />
			<path d="M15 17l-.5 -4" />
		</svg>
	)
}

export function EyesOpenSVG({ className, ref, onClick }: SVGInterface) {
	return (
		<svg
			ref={ref}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			onClick={onClick}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
			<path d="M15.03 17.478a8.797 8.797 0 0 1 -3.03 .522c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6a20.48 20.48 0 0 1 -.258 .419" />
			<path d="M19 16v3" />
			<path d="M19 22v.01" />
		</svg>
	)
}
