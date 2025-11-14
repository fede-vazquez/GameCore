import { GameSideCard } from '@/components/game'
import { DiscountBanner } from '@/components/game/discount'
import { ElementSlider, GCDivider, GCSkeleton } from '@/components/GCgenerics'
import { useLibraryContext } from '@/context'
import type { CustomError } from '@/errors'
import type { GameListResponse, GetGameDTO } from '@/models'
import { makeApiCall } from '@/services/apiCall'
import { FormatDateISO, QUERY_KEYS, stringToColor } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Redirect, useParams } from 'wouter'
import { ModalPlata } from './components/modalPlata'

export function GamePage() {
	const { id } = useParams()
	const { libraryGames } = useLibraryContext()
	if (!id) return <Redirect href="/library" />

	const [buyError, setBuyError] = useState<CustomError | null>(null)

	const { data } = useQuery({
		queryKey: [QUERY_KEYS.GET_SPECIFIC_GAME(id)],
		queryFn: async () => {
			try {
				return await makeApiCall<GetGameDTO>({ endpoint: '/Games/{id}', opts: { parameter: id } })
			} catch {
				return {} as GetGameDTO
			}
		}
	})

	const { data: recData } = useQuery({
		queryKey: [QUERY_KEYS.GET_GAME_BY_GENRE(data?.id)],
		queryFn: async () => {
			try {
				const genreId = data?.genres?.at(0)?.id
				if (!genreId) return
				return (
					await makeApiCall<GameListResponse>({
						endpoint: '/Games?',
						opts: { parameter: id, filters: { Genre: genreId } }
					})
				)?.items
			} catch {
				return [] as GameListResponse['items']
			}
		}
	})

	return (
		<>
			<article className="relative flex flex-col justify-between w-full 2xl:w-[90%] m-auto p-4 rounded-xl border-2 border-neutral-800">
				{data?.imageUrl ? (
					<section
						style={{ backgroundImage: `url('${data.imageUrl}')` }}
						className="rounded-xl h-[300px] w-full mask-b-from-20% mask-b-to-80% bg-no-repeat bg-cover bg-center"
					/>
				) : (
					<GCSkeleton className="h-[300px] w-full mb-4" />
				)}

				<span className="w-fit m-auto flex justify-center -translate-y-full">
					<h3 className="text-3xl font-semibold px-1 text-center">{data?.title ?? 'Loading'}</h3>
					<GCDivider className="bottom-0" />
				</span>

				<section className="flex flex-col md:flex-row gap-x-6 gap-y-2 h-full md:max-h-[400px]!">
					<div className="md:aspect-2/3 w-[300px] sm:w-[400px] m-auto md:m-0 md:ml-10 md:w-[270px] md:min-w-[270px] md:h-[400px] shrink-0 rounded-lg overflow-hidden select-none">
						{data?.imageUrl ? (
							<img
								draggable={false}
								src={data.imageUrl}
								alt={`Portrait image of ${data.title}`}
								className="w-full h-full object-contain md:object-cover transition-all duration-300 hover:scale-110"
							/>
						) : (
							<GCSkeleton className="h-full w-full" />
						)}
					</div>
					<span className="flex flex-col gap-y-2">
						<section className="flex flex-col items-center gap-y-2 xl:flex-row justify-between">
							<span className="flex flex-row-reverse gap-3 items-end mr-4">
								{data?.description ? (
									<DiscountBanner dsPer={data?.discount?.percentageValue ?? 0} price={data?.price} />
								) : (
									<GCSkeleton className="h-8 w-40 grow!" />
								)}
							</span>
							<ul className="flex flex-wrap flex-row gap-x-1 gap-y-1">
								{data?.genres?.map((e) => (
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

						{data?.description ? (
							<span className="h-40 bg-neutral-800 border border-neutral-700 p-2 rounded-lg overflow-y-scroll">
								<p className="grow overflow-y-auto text-primaryWhite">{data.description}</p>
							</span>
						) : (
							<GCSkeleton className="h-40 w-[600px] grow!" />
						)}

						<section className="flex flex-col-reverse gap-y-2 justify-between gap-x-5 items-center w-full md:flex-row">
							<ModalPlata
								game={data}
								id={data?.id ?? 0}
								setErrorBuy={setBuyError}
								idDiscount={data?.discount?.id ?? 0}
							/>

							<span className="flex flex-row gap-x-2 md:flex-col items-center text-neutral-400">
								<h5 className="text-neutral-400 text-sm md:text-base">{FormatDateISO(data?.releaseDate ?? '')}</h5>
								<p>{data?.developer?.name}</p>
							</span>
						</section>
						{buyError != null && <p className="text-red-400 text-center">{buyError.message}</p>}
					</span>
					<span className="flex-col gap-y-5 w-[40%]! min-w-[230px] bg-neutral-900 rounded-lg px-2 py-4 border border-neutral-600 hidden 2xl:flex">
						<span className="relative h-fit mx-auto w-fit flex items-center justify-center">
							<h3 className="text-base font-semibold px-1 text-center">Recommendations</h3>
							<GCDivider className="bottom-0" />
						</span>
						<ul className="flex flex-col h-full gap-y-2 justify-start overflow-y-auto px-4">
							{recData?.length &&
								recData?.map((e) => {
									return (
										<li key={e?.id} className="flex flex-col">
											<GameSideCard
												className="flex flex-row"
												game={e}
												addPrice={{ discount: e?.discount?.percentageValue ?? 0, price: e?.price ?? 0 }}
											/>
										</li>
									)
								})}
						</ul>
					</span>
				</section>
			</article>
			<ElementSlider
				elements={
					recData?.length
						? recData?.filter(({ id: gId }) => {
								return !libraryGames.find(({ id: lId }) => {
									return gId === lId || gId == data?.id
								})
							})
						: []
				}
				titleName="Recommendations"
				className="2xl:hidden mt-5! pb-20!"
				classImg="w-[120px] max-w-[120px]!"
				classPrice="flex-reverse-row! gap-x-2! justify-center! text-sm!"
				classScroll="flex flex-row gap-x-4!"
				removeOldPrice
			/>
		</>
	)
}
