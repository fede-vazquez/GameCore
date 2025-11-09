// o otro idioma
export const numberParser = (numb: number, discount?: number): string => {
	const realPrice = discount ? numb - numb * (discount / 100) : numb

	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
		roundingMode: 'floor' // 93.12% of browsers supports this
	}).format(realPrice)

	// in case we keep using es2022?
	// return price.endsWith('.99') ? price : (parseFloat(price) - 0.01).toFixed(2)
}
