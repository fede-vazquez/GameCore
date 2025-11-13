import { ElementSlider } from '@/components/GCgenerics/ElementSlider'
import { useLibraryContext } from '@/context'

export function LibraryPage() {
	const { isPending, libraryGames } = useLibraryContext()

	//! the endpoint just returns the id for the game. i wont be doing this
	/*
	const [enabled, setEnabled] = useState<boolean>(true)
	const { data, isPending: descPend } = useQuery({
		queryKey: [QUERY_KEYS.GET_DISCOUNT_GAMES],
		queryFn: async () => {
			try {
				return await makeApiCall<GameListResponse>({
					endpoint: '/Games?',
					opts: { filters: { minDiscount: 0, maxDiscount: 100 } }
				})
			} catch {
				return []
			}
		},
		refetchOnMount: false,
		enabled: enabled
	})

	useEffect(() => {
		if (!data) return
		setEnabled(false)
	}, [data])
	*/

	return (
		<main className="flex flex-col gap-y-5">
			<ElementSlider isPending={isPending} elements={libraryGames} titleName="Your Library" />

			{/* <ElementSlider
				isPending={descPend}
				elements={}
				titleName="Today discounts"
				fallbackMsg={{ description: "Seems there's no discounts today, huh?" }}
			/> */}
		</main>
	)
}
