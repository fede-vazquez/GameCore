import { type RefObject } from 'react'

export interface SVGInterface {
	className?: string
	onClick?: (...args: any[]) => void
	ref?: RefObject<SVGSVGElement | null>
}

export * from './caretSvg'
export * from './checkSvg'
export * from './consoleSvg'
export * from './controllerSvg'
export * from './emailSvg'
export * from './eyesSvg'
export * from './filtersSvg'
export * from './lockSvg'
export * from './menuSvg'
export * from './searchSvg'
export * from './storeSvg'
export * from './throbberSvg'
export * from './userSvg'
export * from './XSvg'
