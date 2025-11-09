import { FiltersSVG } from '@/assets'
import { DropdownMenu } from 'radix-ui'

export function FilterDropMenu() {
	// by default open for testing purposes
	return (
		<DropdownMenu.Root open>
			{/* radix wont let me use the GCButton */}
			<DropdownMenu.Trigger className="flex gap-4  bg-transparent border h-8 items-center rounded-md px-4 py-2 cursor-pointer hover:brightness-90">
				Filters
				<FiltersSVG />
			</DropdownMenu.Trigger>
			<DropdownMenu.Content className="bg-neutral-900 rounded-lg p-3 z-30!">
				<DropdownMenu.Separator />
				<DropdownMenu.Item color="red">Clear all</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	)
}
