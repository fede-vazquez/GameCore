import { Tabs } from 'radix-ui'
import type { JSX } from 'react'

interface whitId {
	id: string | number
}

export function GCList<T extends whitId>({
	dataList,
	fnMap,
	mode = 'horizontal',
	type = 'list'
}: {
	dataList: T[]
	fnMap: (item: T) => JSX.Element
	mode?: 'horizontal' | 'vertical'
	type?: 'list' | 'grid'
}) {
	return (
		<Tabs.Root asChild orientation={mode}>
			<Tabs.List asChild>
				<ul
					className={
						'p-2 ' + (type === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5' : 'flex flex-col gap-5')
					}
				>
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
