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
			className={`rounded-xl! border border-zinc-700 *:text-primaryWhite! *:placeholder:text-neutral-400! bg-neutral-900! ${className}`}
		>
			<TextField.Slot side={side ?? 'left'}>{svg ?? <SearchSVG className="text-zinc-400" />}</TextField.Slot>
		</TextField.Root>
	)
}
