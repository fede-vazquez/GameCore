import { CaretSVG, CheckedSVG, ChevronSVG } from '@/assets'
import { Select } from 'radix-ui'

interface GCSelectProps {
	options: Array<string>
	placeholder: string
}

export function GCSelect({ options, placeholder }: GCSelectProps) {
	return (
		<Select.Root>
			<Select.Trigger className="w-full">
				<span className="flex grow gap-1.5 text-sm items-center border w-full border-neutral-600 p-1 rounded-md">
					<Select.Value placeholder={placeholder} />
					<Select.Icon>
						<ChevronSVG />
					</Select.Icon>
				</span>
			</Select.Trigger>

			<Select.Portal>
				<Select.Content className="*:text-primaryWhite bg-neutral-900 border border-neutral-600 rounded-lg p-3">
					<Select.ScrollUpButton className="flex justify-center border-b border-b-neutral-400 hover:brightness-110">
						<CaretSVG className="rotate-270!" />
					</Select.ScrollUpButton>

					<Select.Viewport>
						<Select.Item value="anything" className="flex">
							<Select.ItemIndicator>
								<CheckedSVG />
							</Select.ItemIndicator>
							<Select.ItemText>Anything</Select.ItemText>
						</Select.Item>

						<Select.Separator />

						<Select.Group>
							{options.map((t) => (
								<Select.Item value={t.toLowerCase()} key={t.toLowerCase()} className="flex">
									<Select.ItemIndicator>
										<CheckedSVG />
									</Select.ItemIndicator>
									<Select.ItemText>{t}</Select.ItemText>
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
	)
}
