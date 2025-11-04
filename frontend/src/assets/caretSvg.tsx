import type { SVGInterface } from '.'

type CaretProps = {
	position?: 'left' | 'right'
} & SVGInterface

export function CaretSVG({ className, ref, onClick, position = 'right', strokeColor = 'black' }: CaretProps) {
	return (
		<svg
			onClick={onClick}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke={strokeColor}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={`${position === 'right' ? '' : 'rotate-180'} ${className}`}
			ref={ref}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M10 18l6 -6l-6 -6v12" />
		</svg>
	)
}
