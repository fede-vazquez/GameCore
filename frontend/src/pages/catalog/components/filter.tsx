import { FiltersSVG, IconXSVG } from '@/assets'
import { GCInput } from '@/components/GCgenerics'
import { GCSelect } from '@/components/GCgenerics/Select'
import type { GameModel } from '@/models'
import { makeApiCall } from '@/services/apiCall'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@radix-ui/themes'
import { DropdownMenu, Form } from 'radix-ui'
import { useState, type ReactNode } from 'react'
import { useForm, type UseFormRegisterReturn } from 'react-hook-form'
import z from 'zod'
import { useCatalogContext } from '../context'

const INPUT_NAMES = {
	MAX_PRICE_RANGE: 'max_price',
	MIN_PRICE_RANGE: 'min_price',
	GENRE: 'genre',
	MIN_RELEASE_YEAR: 'min_release',
	MAX_RELEASE_YEAR: 'max_release'
} as const

const default_vals = {
	max_price: 999,
	min_price: 0,
	min_release_year: 1958,
	max_release_year: new Date().getFullYear()
} as const

const FILTER_VALIDATOR = z
	.object({
		[INPUT_NAMES.MAX_PRICE_RANGE]: z.coerce.number().max(default_vals.max_price).min(0).optional(),
		[INPUT_NAMES.MIN_PRICE_RANGE]: z.coerce.number().max(default_vals.max_price).min(0).optional(),
		[INPUT_NAMES.GENRE]: z.string().optional(),
		[INPUT_NAMES.MAX_RELEASE_YEAR]: z
			.preprocess(
				(val) => (val === '' ? undefined : val),
				z.coerce.number().max(default_vals.max_release_year).min(default_vals.min_release_year).optional()
			)
			.optional(),

		[INPUT_NAMES.MIN_RELEASE_YEAR]: z
			.preprocess(
				(val) => (val === '' ? undefined : val),
				z.coerce.number().max(default_vals.max_release_year).min(default_vals.min_release_year).optional()
			)
			.optional()
	})
	.refine(
		(d) =>
			(d[INPUT_NAMES.MAX_PRICE_RANGE] ?? default_vals.max_price) >=
			(d[INPUT_NAMES.MIN_PRICE_RANGE] ?? default_vals.min_price),
		{
			path: [INPUT_NAMES.MIN_PRICE_RANGE],
			error: 'MinPrice cannot be higher than MaxPrice'
		}
	)
	.refine(
		(d) =>
			(d[INPUT_NAMES.MAX_RELEASE_YEAR] ?? default_vals.min_release_year) >=
			(d[INPUT_NAMES.MIN_RELEASE_YEAR] ?? default_vals.min_release_year),
		{
			path: [INPUT_NAMES.MIN_RELEASE_YEAR],
			error: 'MinYear cannot be older than MaxYear'
		}
	)

export function FilterDropMenu({ selectOptions, games }: { selectOptions: string[]; games: GameModel[] | undefined }) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { startTransition, setCatalogGames } = useCatalogContext()

	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<z.infer<typeof FILTER_VALIDATOR>>({
		resolver: zodResolver(FILTER_VALIDATOR) as any //todo: fix this
	})

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
				<Form.Root
					className="flex flex-col gap-y-2"
					onSubmit={handleSubmit((e) => {
						startTransition(async () => {
							const data = await makeApiCall<GameModel[]>({ endpoint: '/games?', opts: { filters: e } })
							if (!data) return
							setCatalogGames(data)
						})
					})}
				>
					<DropdownMenuItem>
						<span className="flex relative items-center">
							<RangeInput
								className={errors[INPUT_NAMES.MIN_PRICE_RANGE] && 'border-red-400!'}
								placeholder={String(default_vals.min_price)}
								fieldName={INPUT_NAMES.MIN_PRICE_RANGE}
								register={register(INPUT_NAMES.MIN_PRICE_RANGE)}
							/>
							<div className="w-4 h-px mx-1 rounded-xl translate-y-0.5 bg-neutral-400" />
							<RangeInput
								className={errors[INPUT_NAMES.MAX_PRICE_RANGE] && 'border-red-400!'}
								placeholder={String(default_vals.max_price)}
								fieldName={INPUT_NAMES.MAX_PRICE_RANGE}
								register={register(INPUT_NAMES.MAX_PRICE_RANGE)}
							/>
						</span>
					</DropdownMenuItem>

					<DropdownMenuItem>
						<GCSelect
							className={errors[INPUT_NAMES.GENRE] && 'border-red-400!'}
							control={control}
							register={register(INPUT_NAMES.GENRE)}
							options={selectOptions}
							placeholder="Select Genre"
						/>
					</DropdownMenuItem>

					{/* i dont have enough time for this */}
					<DropdownMenuItem>
						<label className="text-neutral-400 text-sm">Select year of release</label>
						<span className="flex relative items-center">
							<RangeInput
								className={errors[INPUT_NAMES.MIN_RELEASE_YEAR] && 'border-red-400!'}
								placeholder={String(default_vals.min_release_year)}
								disableChild
								fieldName={INPUT_NAMES.MIN_RELEASE_YEAR}
								register={register(INPUT_NAMES.MIN_RELEASE_YEAR)}
							/>
							<div className="w-4 h-px mx-1 rounded-xl translate-y-0.5 bg-neutral-400" />
							<RangeInput
								className={errors[INPUT_NAMES.MAX_RELEASE_YEAR] && 'border-red-400!'}
								placeholder={String(default_vals.max_release_year)}
								disableChild
								fieldName={INPUT_NAMES.MAX_RELEASE_YEAR}
								register={register(INPUT_NAMES.MAX_RELEASE_YEAR)}
							/>
						</span>
					</DropdownMenuItem>

					<DropdownMenu.Separator className="bg-neutral-500 w-full! h-px rounded-xl! translate-y-full" />

					<DropdownMenuItem>
						<span className="flex flex-row justify-evenly gap-x-2 items-center">
							<Button
								type="reset"
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
	className?: string
	disableChild?: boolean
	register: UseFormRegisterReturn<any>
}

function RangeInput({ placeholder, fieldName, disableChild = false, className, register }: RangeInputProps) {
	return (
		<GCInput
			register={register}
			placeholder={placeholder}
			formFieldName={fieldName}
			type="text"
			className="relative text-sm flex! items-center!"
			classInput={`w-20! h-8! ${!disableChild && 'pl-6!'} ${className}`}
			disableSvgPlaceholder
		>
			{!disableChild && <p className="absolute text-zinc-400 translate-y-1/2 -top-1 left-2">$</p>}
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
