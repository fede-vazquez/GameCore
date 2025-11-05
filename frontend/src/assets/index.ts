import { type RefObject } from 'react'

export interface SVGInterface {
	className?: string
	onClick?: (...args: any[]) => void
	ref?: RefObject<SVGSVGElement | null>
}

export * from './caretSvg'
export * from './consoleSvg'
export * from './controllerSvg'
export * from './emailSvg'
export * from './eyesSvg'
export * from './lockSvg'
export * from './searchSvg'
export * from './storeSvg'
export * from './userSvg'
