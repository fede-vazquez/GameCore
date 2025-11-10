import { FiltersSVG, IconXSVG } from '@/assets'
import { GCInput } from '@/components/GCgenerics'
import { GCSelect } from '@/components/GCgenerics/Select'
import type { GameModel } from '@/models'
import { Button } from '@radix-ui/themes'
import { DropdownMenu, Form } from 'radix-ui'
import { useState, type ReactNode } from 'react'

const INPUT_NAMES = {
	MAX_PRICE_RANGE: 'maxPrice',
	MIN_PRICE_RANGE: 'minPrice',
	GENRE: 'genre',
	RELEASE_YEAR: 'release_year'
} as const

export function FilterDropMenu({ selectOptions, games }: { selectOptions: string[]; games: GameModel[] | undefined }) {
	const [isOpen, setIsOpen] = useState<boolean>(true)

	return (
		<DropdownMenu.Root open={isOpen} modal>
			{/* radix wont let me use the GCButton */}
			<DropdownMenu.Trigger
				onClick={() => setIsOpen(true)}
				className="flex gap-4 bg-transparent border h-8 items-center rounded-md px-4 py-2 cursor-pointer hover:brightness-90"
			>
				Filters
				<FiltersSVG />
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				onInteractOutside={(e) => e.preventDefault()}
				className="bg-neutral-900 border border-neutral-600 rounded-lg p-3 z-30!"
			>
				<DropdownMenuItem className="flex! justify-between! items-center">
					<p className="text-xs text-zinc-400">{games?.length ?? 0} Games</p>
					<IconXSVG className="mr-4! h-5! text-primaryWhite cursor-pointer" onClick={() => setIsOpen(false)} />
				</DropdownMenuItem>
				<Form.Root className="flex flex-col gap-y-2" onSubmit={(e) => e.preventDefault()}>
					<DropdownMenuItem>
						<span className="flex relative items-center">
							<RangeInput placeholder="0" fieldName={INPUT_NAMES.MIN_PRICE_RANGE} />
							<div className="w-4 h-px mx-1 rounded-xl translate-y-0.5 bg-neutral-400" />
							<RangeInput placeholder="999" fieldName={INPUT_NAMES.MAX_PRICE_RANGE} />
						</span>
					</DropdownMenuItem>

					<DropdownMenuItem>
						<GCSelect options={selectOptions} placeholder="Select Genre" />
					</DropdownMenuItem>

					<DropdownMenu.Separator className="bg-neutral-500 w-full! h-px rounded-xl! translate-y-full" />

					<DropdownMenuItem>
						<span className="flex flex-row justify-evenly gap-x-2 items-center">
							<Button
								color="red"
								variant="soft"
								className="text-red-500! bg-red-700/20! cursor-pointer! hover:brightness-110!"
							>
								Clear All
							</Button>
							<Button
								color="blue"
								variant="soft"
								className="text-sky-500! bg-sky-700/20! cursor-pointer! hover:brightness-110!"
							>
								Search
							</Button>
						</span>
					</DropdownMenuItem>
				</Form.Root>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	)
}

interface RangeInputProps {
	placeholder: string
	fieldName: string
}

function RangeInput({ placeholder, fieldName }: RangeInputProps) {
	return (
		<GCInput
			placeholder={placeholder}
			formFieldName={fieldName}
			type="text"
			className="relative text-sm flex! items-center!"
			classInput="w-20! pl-6! h-8!"
			disableSvgPlaceholder
		>
			<p className="absolute text-zinc-400 translate-y-1/2 -top-1 left-2">$</p>
		</GCInput>
	)
}

function DropdownMenuItem({ children, className }: { children: ReactNode; className?: string }) {
	//necessary to avoid losing focus on inputs
	return (
		<DropdownMenu.Item
			className={className}
			onPointerLeave={(e) => e.preventDefault()}
			onPointerMove={(e) => e.preventDefault()}
		>
			{children}
		</DropdownMenu.Item>
	)
}
