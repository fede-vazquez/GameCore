import { SearchSVG } from '@/assets'
import { TextField } from '@radix-ui/themes'
import type { ReactNode, RefObject } from 'react'

interface searchBarProps {
	placeholder: string

	side?: TextField.SlotProps['side']
	variant?: TextField.RootProps['variant']
	svg?: ReactNode
	ref?: RefObject<HTMLInputElement>
	className?: string
}

export function GCSearchBar({ variant, placeholder, side, ref, className, svg }: searchBarProps) {
	return (
		<TextField.Root
			variant={variant ?? 'classic'}
			placeholder={placeholder}
			ref={ref}
			color="gold"
			className={`rounded-xl! border border-zinc-200 ${className}`}
		>
			<TextField.Slot side={side ?? 'left'}>{svg ?? <SearchSVG />}</TextField.Slot>
		</TextField.Root>
	)
}
