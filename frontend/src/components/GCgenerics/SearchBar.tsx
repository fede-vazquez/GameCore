import { SearchSVG } from '@/assets'
import { TextField } from '@radix-ui/themes'
import type { ChangeEvent, ReactNode, RefObject } from 'react'

interface searchBarProps {
	placeholder: string

	side?: TextField.SlotProps['side']
	variant?: TextField.RootProps['variant']
	svg?: ReactNode
	ref?: RefObject<HTMLInputElement>
	className?: string
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export function GCSearchBar({ variant, placeholder, side, ref, className, svg, onChange }: searchBarProps) {
	return (
		<TextField.Root
			variant={variant ?? 'classic'}
			placeholder={placeholder}
			ref={ref}
			onChange={onChange}
			className={`rounded-xl! border border-zinc-700 *:text-primaryWhite! *:placeholder:text-neutral-400! bg-neutral-900! ${className}`}
		>
			<TextField.Slot side={side ?? 'left'}>{svg ?? <SearchSVG className="text-zinc-400" />}</TextField.Slot>
		</TextField.Root>
	)
}
