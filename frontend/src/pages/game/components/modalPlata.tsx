import { IconXSVG } from '@/assets'
import { GCButton } from '@/components/GCgenerics'
import { useLibraryContext } from '@/context'
import type { CustomError } from '@/errors'
import type { GenreDTO, GetGameDTO, PaymentDTO } from '@/models'
import { makeApiCall } from '@/services/apiCall'
import { QUERY_KEYS, type SetState } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { Dialog } from 'radix-ui'
import { useEffect, useRef, useState } from 'react'

interface ModalPlataProps {
	id: number
	idDiscount: number
	setErrorBuy: SetState<CustomError | null>
	game: GetGameDTO | undefined
}

export function ModalPlata({ id, setErrorBuy, idDiscount, game }: ModalPlataProps) {
	//this needs a context....
	const paymentMethodsSaver = useRef<GenreDTO[]>([])
	const [pays, setPays] = useState<GenreDTO[]>(paymentMethodsSaver.current)

	const [selected, setSelected] = useState<string>()

	const [idPay, setIdPay] = useState<number>()
	const [open, setOpen] = useState<boolean>(false)

	useEffect(() => {
		setErrorBuy(null)
	}, [id])

	const { libraryGames, setLibraryGames } = useLibraryContext()

	// i know, its a horrible practice but we have no more time
	const findGame = libraryGames.find((e) => e.id === id)

	useQuery({
		queryKey: [QUERY_KEYS.GET_PAY_METHOD],
		refetchOnMount: false,
		enabled: paymentMethodsSaver.current.length === 0,
		queryFn: async () => {
			try {
				const data = await makeApiCall<PaymentDTO[]>({
					endpoint: '/Games/payment-methods'
				})
				paymentMethodsSaver.current = data
				setPays(data)
			} catch {
				return [] as PaymentDTO[]
			}
		}
	})

	return (
		<Dialog.Root open={open}>
			<Dialog.Trigger asChild>
				<GCButton
					theme="primary"
					className={`flex justify-center w-fit ${findGame && 'bg-neutral-700! border-neutral-800!'}`}
					disabled={!pays.length || !!findGame}
					onClick={() => setOpen(true)}
				>
					{findGame ? 'Already owned' : 'Add to library'}
				</GCButton>
			</Dialog.Trigger>

			<Dialog.Portal>
				{/* Overlay */}
				<Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

				{/* Dialog Content */}
				<Dialog.Content
					className="fixed left-1/2 top-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2
                     rounded-lg bg-neutral-900 text-gray-100 p-6 shadow-lg border border-neutral-800"
				>
					<div className="flex justify-between items-center mb-4">
						<Dialog.Title className="text-lg font-semibold">Select Payment Method</Dialog.Title>
						<Dialog.Close asChild>
							<button className="text-gray-400 hover:text-gray-200" onClick={() => setOpen(false)}>
								<IconXSVG />
							</button>
						</Dialog.Close>
					</div>

					<div className="flex flex-col gap-3">
						{pays?.length &&
							pays.map(({ id, name }) => {
								const nameSpaced = name.match(/[A-Z][a-z]+/g)?.join(' ')
								return (
									<button
										key={id}
										onClick={() => {
											setSelected(nameSpaced)
											setIdPay(id)
										}}
										className={`w-full px-4 py-2 rounded-md text-left border transition 
                ${
									selected === nameSpaced
										? 'bg-blue-900 border-blue-800 text-white'
										: 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700'
								}`}
									>
										{nameSpaced}
									</button>
								)
							})}
					</div>

					{selected && (
						<div className="mt-4 text-sm text-gray-400">
							Selected: <span className="text-gray-200 font-medium capitalize">{selected}</span>
						</div>
					)}

					<div className="mt-6 flex justify-end">
						<Dialog.Close asChild>
							<GCButton
								theme="primary"
								className="flex justify-center w-fit"
								disabled={!selected || !pays.length || !!findGame}
								onClick={async () => {
									try {
										if (game === undefined) return
										await makeApiCall<GetGameDTO>({
											endpoint: '/Games/{id}/buy',
											httpMethod: 'PUT',
											opts: { parameter: String(id) },
											body: { paymentMethodId: idPay ?? 0, discountApplied: idDiscount }
										})
										setLibraryGames((prev) => [...prev, game])
									} catch (err) {
										setErrorBuy(err as CustomError)
									} finally {
										setOpen(false)
									}
								}}
							>
								Confirm
							</GCButton>
						</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
