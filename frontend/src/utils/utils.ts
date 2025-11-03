// o otro idioma
export const numberParser = (numb: number): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumSignificantDigits: 4,
		minimumSignificantDigits: 4,
		roundingMode: 'floor' // 93.12% of browsers supports this
	}).format(numb)

	// in case we keep using es2022?
	// return price.endsWith('.99') ? price : (parseFloat(price) - 0.01).toFixed(2)
}
