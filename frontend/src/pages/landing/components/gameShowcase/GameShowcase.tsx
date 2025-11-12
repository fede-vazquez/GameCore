import { Box } from '@radix-ui/themes'
import { Tabs } from 'radix-ui'
import { useState } from 'react'
import { TabButton } from './TabButton'
import GameList from './GameList'

const TABS = {
	POPULAR: 'popular',
	DISCOUNT: 'discount',
	NEW: 'new'
} as const

export function GameShowcase() {
	const [selectedTab, setSelectedTab] = useState<typeof TABS.POPULAR | typeof TABS.DISCOUNT | typeof TABS.NEW>(
		TABS.POPULAR
	)

	const handleTabChange = (value: string) => {
		setSelectedTab(value as typeof TABS.POPULAR | typeof TABS.DISCOUNT | typeof TABS.NEW)
	}

	return (
		<section>
			<Tabs.Root defaultValue={TABS.POPULAR} onValueChange={handleTabChange}>
				<Tabs.List className="flex justify-center md:gap-5">
					<TabButton value={TABS.POPULAR} content="Populares" selected={selectedTab === TABS.POPULAR} />
					<TabButton value={TABS.NEW} content="Nuevos lanzamientos" selected={selectedTab === TABS.NEW} />
					<TabButton value={TABS.DISCOUNT} content="En descuentos" selected={selectedTab === TABS.DISCOUNT} />
				</Tabs.List>
				<Box className="transition-all duration-300 min-h-[60vh]">
					<Tabs.Content value={TABS.POPULAR}>
						<GameList fetchUrl="/api/games?" />
					</Tabs.Content>
					<Tabs.Content value={TABS.NEW}>
						<GameList fetchUrl="/api/games?" />
					</Tabs.Content>
					<Tabs.Content value={TABS.DISCOUNT}>
						<GameList fetchUrl="/api/games?" />
					</Tabs.Content>
				</Box>
			</Tabs.Root>
		</section>
	)
}
