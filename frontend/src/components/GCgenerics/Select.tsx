import { CaretSVG, CheckedSVG, ChevronSVG } from '@/assets'
import type { GenreDTO } from '@/models'
import { Select } from 'radix-ui'
import { Controller, type UseFormRegisterReturn } from 'react-hook-form'

interface GCSelectProps {
	className?: string
	options: GenreDTO[]
	placeholder: string
	control: any
	register: UseFormRegisterReturn<any>
}

export function GCSelect({ options, control, placeholder, className, register }: GCSelectProps) {
	const newOptions: GenreDTO[] = [{ id: 0, name: 'Anything' }, ...options]
	return (
		<Controller
			control={control}
			{...register}
			render={({ field }) => (
				<Select.Root onValueChange={field.onChange} {...field}>
					<Select.Trigger className="w-full">
						<span className="flex grow gap-1.5 text-sm items-center border w-full border-neutral-600 p-1 rounded-md">
							<Select.Value placeholder={placeholder} />
							<Select.Icon>
								<ChevronSVG />
							</Select.Icon>
						</span>
					</Select.Trigger>

					<Select.Portal>
						<Select.Content
							className={`*:text-primaryWhite bg-neutral-900 border border-neutral-600 rounded-lg p-3 ${className}`}
						>
							<Select.ScrollUpButton className="flex justify-center border-b border-b-neutral-400 hover:brightness-110">
								<CaretSVG className="rotate-270!" />
							</Select.ScrollUpButton>

							<Select.Viewport>
								<Select.Group>
									{newOptions.map(({ id, name }) => (
										<Select.Item
											value={name.toLowerCase()}
											key={id}
											className="flex p-1 rounded-sm items-center hover:bg-neutral-800 cursor-pointer"
										>
											<Select.ItemIndicator>
												<CheckedSVG className="h-5" />
											</Select.ItemIndicator>
											<Select.ItemText>{name}</Select.ItemText>
										</Select.Item>
									))}
								</Select.Group>
							</Select.Viewport>

							<Select.ScrollDownButton className="flex justify-center border-t border-t-neutral-400 hover:brightness-110">
								<CaretSVG className="rotate-90!" />
							</Select.ScrollDownButton>
							<Select.Arrow />
						</Select.Content>
					</Select.Portal>
				</Select.Root>
			)}
		></Controller>
	)
}
