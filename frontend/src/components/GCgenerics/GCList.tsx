import { Tabs } from 'radix-ui'
import type { JSX } from 'react'

export function GCList<T extends { id: string | number }>({
	dataList,
	fnMap,
	controlDirection = 'vertical',
	type = 'list'
}: {
	dataList: T[]
	fnMap: (item: T) => JSX.Element
	controlDirection?: 'horizontal' | 'vertical'
	type?: 'list' | 'grid'
}) {
	return (
		<Tabs.Root asChild orientation={controlDirection}>
			<Tabs.List asChild>
				<ul className={'p-2 ' + (type === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'flex flex-col')}>
					{dataList.map((item) => {
						return (
							<Tabs.Trigger asChild key={item.id} value={item.id.toString()}>
								<li className="p-2">{fnMap(item)}</li>
							</Tabs.Trigger>
						)
					})}
				</ul>
			</Tabs.List>
		</Tabs.Root>
	)
}
