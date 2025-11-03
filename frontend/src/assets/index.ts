import type { RefObject } from 'react'

export interface SVGInterface {
	className?: string
	ref?: RefObject<SVGSVGElement>
}

export * from './consoleSvg'
export * from './controllerSvg'
export * from './searchSvg'
export * from './storeSvg'
export * from './userSvg'
