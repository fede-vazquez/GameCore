import type { whitId } from '@/types'
import { Tabs } from 'radix-ui'
import type { JSX } from 'react'

export function ListInfo<T extends whitId>({ dataList, fnMap }: { dataList: T[]; fnMap: (item: T) => JSX.Element }) {
	return (
		<Tabs.Root asChild orientation="vertical">
			<Tabs.List asChild>
				<ul className="p-2">
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
