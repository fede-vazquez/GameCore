import { Tabs } from 'radix-ui'

export function TabButton({
	value,
	content,
	selected = false
}: {
	value: string
	content: string
	selected?: boolean
}) {
	return (
		<Tabs.Trigger
			className={`w-full transition-all duration-300 p-2 py-4 border-b-4 border-gray-700 ${selected ? 'border-primaryWhite bg-primaryBlue scale-110' : ''}`}
			value={value}
		>
			{content}
		</Tabs.Trigger>
	)
}
