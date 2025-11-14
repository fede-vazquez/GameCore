import { Box } from '@radix-ui/themes'
import { Tabs } from 'radix-ui'
import { useState } from 'react'
import GameList from './GameList'
import { TabButton } from './TabButton'

const TABS = {
	BEST_RATED: 'best_rated',
	DISCOUNT: 'discount',
	NEW: 'new'
} as const

export function GameShowcase() {
	const [selectedTab, setSelectedTab] = useState<typeof TABS.BEST_RATED | typeof TABS.DISCOUNT | typeof TABS.NEW>(
		TABS.BEST_RATED
	)

	const handleTabChange = (value: string) => {
		setSelectedTab(value as typeof TABS.BEST_RATED | typeof TABS.DISCOUNT | typeof TABS.NEW)
	}

	return (
		<>
			<Tabs.Root defaultValue={TABS.BEST_RATED} onValueChange={handleTabChange}>
				<Tabs.List className="flex justify-center md:gap-5">
					<TabButton value={TABS.BEST_RATED} content="Mejores Rateados" selected={selectedTab === TABS.BEST_RATED} />
					<TabButton value={TABS.NEW} content="Nuevos lanzamientos" selected={selectedTab === TABS.NEW} />
					<TabButton value={TABS.DISCOUNT} content="En descuentos" selected={selectedTab === TABS.DISCOUNT} />
				</Tabs.List>
				<Box className="transition-all duration-300 min-h-[60vh] bg-neutral-900 border border-neutral-700">
					<Tabs.Content value={TABS.BEST_RATED}>
						<GameList queryName="best_rated" filters={{ Ascending: false, sortBy: 'metacriticScore' }} />
					</Tabs.Content>
					<Tabs.Content value={TABS.NEW}>
						<GameList queryName="new_games" filters={{ Ascending: false, sortBy: 'releaseDate' }} />
					</Tabs.Content>
					<Tabs.Content value={TABS.DISCOUNT}>
						<GameList queryName="discount_games" filters={{ Ascending: false, sortBy: 'discountPercentage' }} />
					</Tabs.Content>
				</Box>
			</Tabs.Root>
		</>
	)
}
