import type { SVGInterface } from '.'

export function DollarSVG({ className, onClick, ref }: SVGInterface) {
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
			<line x1="12" y1="2" x2="12" y2="22" />
			<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
		</svg>
	)
}
