import { useEffect, useState } from 'react'
import { PieChardComponent } from '../PieChardComponent'

export default function SalesDiscountInfoController() {
	const [salesData, setSalesData] = useState({
		totalSales: 0,
		salesWhitDiscount: 0
	})

	useEffect(() => {
		// Mock de llamada a la api
		const resultadoApi = {
			totalSales: 10000,
			salesWhitDiscount: 5000
		}
		setSalesData(resultadoApi)
	}, [])
	return (
		<>
			<h2 className="text-2xl font-bold mb-4">Comparativa ventas</h2>
			<PieChardComponent
				data={[
					{ name: 'Ventas sin descuento', value: salesData.totalSales, color: '#00C49F' },
					{ name: 'Ventas con descuento', value: salesData.salesWhitDiscount, color: '#0088FE' }
				]}
			/>
		</>
	)
}
