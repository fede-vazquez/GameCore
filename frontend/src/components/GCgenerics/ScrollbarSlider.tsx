import { CaretSVG, type SVGInterface } from '@/assets'

interface ArrowProps {
	className?: string
	leftArrow: SVGInterface['onClick']
	rightArrow: SVGInterface['onClick']
}

export function ScrollBarSlider({ className, leftArrow, rightArrow }: ArrowProps) {
	return (
		<div
			className={`flex gap-x-1
		*:cursor-pointer *:border-2 *:border-neutral-800 *:rounded-md *:p-0.5 *:h-7 *:w-7 
		*:hover:bg-neutral-700 *:transition-all ${className}`}
		>
			<CaretSVG onClick={leftArrow} position="left" />
			<CaretSVG onClick={rightArrow} position="right" />
		</div>
	)
}
