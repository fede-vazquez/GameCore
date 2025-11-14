import { Tabs } from 'radix-ui'
import type { JSX } from 'react'

export function GCList<T extends { id: string | number }>({
	dataList,
	fnMap,
	mode = 'horizontal',
	type = 'list',
	className
}: {
	dataList: T[]
	fnMap: (item: T) => JSX.Element
	mode?: 'horizontal' | 'vertical'
	type?: 'list' | 'grid'
	className?: string
}) {
	return (
		<Tabs.Root asChild orientation={mode} className="z-10">
			<Tabs.List asChild>
				<ul
					className={`
						${'p-2 ' + (type === 'grid' ? 'grid grid-cols-1 place-items-center sm:grid-cols-2 w-full md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-4' : 'flex flex-col gap-5')} w-full ${className}
					`}
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
