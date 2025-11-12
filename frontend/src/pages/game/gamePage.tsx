import { DiscountBanner } from '@/components/game/discount'
import { GCButton, GCDivider } from '@/components/GCgenerics'
import type { GetGameDTO } from '@/models'
import { makeApiCall } from '@/services/apiCall'
import { QUERY_KEYS } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { Redirect, useParams } from 'wouter'

const data: GetGameDTO = {
	id: 42,
	title: 'Factorio',
	description:
		'Factorio is a game about building and maintaining factories. You will be mining resources, researching technologies, building infrastructure, automating production, and fighting enemies.',
	imageUrl: '/fallback_image.png',
	price: 35.0,
	releaseDate: '2020-08-14',
	developer: {
		id: 101,
		name: 'Wube Software LTD.'
	},
	discount: {
		id: 201,
		percentageValue: 0,
		startDate: '2024-01-01T00:00:00Z',
		endDate: '2024-01-01T00:00:00Z'
	},
	genres: [
		{ id: 301, name: 'Simulation' },
		{ id: 302, name: 'Strategy' },
		{ id: 303, name: 'Automation' },
		{ id: 304, name: 'Base Building' }
	],
	isActive: true
}

export function GamePage() {
	const { id } = useParams()
	if (!id) return <Redirect href="/library" />

	const { error, isPending } = useQuery({
		queryKey: [QUERY_KEYS.GET_SPECIFIC_GAME(id)],
		queryFn: async () => {
			try {
				return await makeApiCall<GetGameDTO>({ endpoint: '/games/{id}', opts: { parameter: id } })
			} catch {
				return {} as GetGameDTO
			}
		}
	})

	return (
		<article className="flex flex-col justify-between w-full m-auto p-4 rounded-xl border-2 border-neutral-800">
			<section
				style={{ backgroundImage: `url('${data.imageUrl}')` }}
				className="rounded-xl h-[300px] w-full mask-b-from-20% mask-b-to-80% bg-no-repeat bg-cover bg-center"
			/>

			<span className="w-fit m-auto flex justify-center -translate-y-full">
				<h3 className="text-3xl font-semibold px-1">{data.title}</h3>
				<GCDivider className="bottom-0" />
			</span>

			<section className="relative flex flex-row gap-x-6 h-full">
				<div className="aspect-2/3 w-[270px] min-w-[270px] h-[400px] shrink-0 rounded-lg overflow-hidden select-none">
					<img
						draggable={false}
						src={data.imageUrl}
						alt={`Portrait image of ${data?.title}`}
						className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
					/>
				</div>
				<span className="flex flex-col gap-y-2 max-h-[400px]">
					<section className="flex justify-between">
						<span className="flex flex-row-reverse gap-3 items-end mr-4">
							<DiscountBanner dsPer={10} price={data.price} />
						</span>
						<ul className="flex flex-row gap-x-1">
							{data.genres.map((e) => (
								<li
									key={e.id}
									className="border px-2 py-1 text-sm rounded-md text-neutral-300"
									style={{
										borderColor: `hsla(${stringToColor(e.name)}, 0.5)`,
										color: `hsl(${stringToColor(e.name)})`
									}}
								>
									<p>{e.name}</p>
								</li>
							))}
						</ul>
					</section>

					<span className="divide divide-y-2 h-40 bg-neutral-800 p-2 rounded-lg">
						<p className="grow overflow-y-auto text-primaryWhite">{data.description}</p>
					</span>

					<GCButton theme="primary" className="flex justify-center w-fit">
						Add to library
					</GCButton>
				</span>
			</section>
		</article>
	)
}

// https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
const stringToColor = (str: string) => {
	let hash = 0
	str.split('').forEach((char) => {
		hash = char.charCodeAt(0) + ((hash << 10) - hash)
	})

	const hue = hash % 180
	const saturation = 90
	const lightness = 65
	return `${hue}, ${saturation}%, ${lightness}%`
}
