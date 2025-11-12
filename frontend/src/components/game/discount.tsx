import { numberParser } from '@/utils'

const FREE_PRICE = '0' as const

export function DiscountBanner({ dsPer, price }: { dsPer: number | undefined; price: number }) {
	const finalPrice = price > 0 ? numberParser(price, dsPer) : FREE_PRICE
	const isFree = finalPrice !== FREE_PRICE ? finalPrice : 'Free!'

	if (!dsPer) return <p className="text-green-300 font-semibold">{isFree}</p>

	return (
		<>
			<p className="text-center bg-neutral-100 text-neutral-900 px-1 py-0.5 text-sm rounded-md font-semibold">
				{dsPer}%
			</p>
			<div className="flex gap-x-1.5">
				<p className="text-zinc-500 line-through">${price}</p>
				<p className="font-semibold text-primaryWhite ">{isFree}</p>
			</div>
		</>
	)
}
