import { useQuery } from '@tanstack/react-query'
import type { GetDevelopDTO } from '@/models'
import { GCSelect } from '@/components/GCgenerics'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { makeApiCall } from '@/services/apiCall'

interface SelectDeveloperProps {
	label: string
	error: FieldError | undefined
	register: UseFormRegisterReturn<any>
	control: any
}

export function SelectDeveloper({ label, error, register, control }: SelectDeveloperProps) {
	const {
		data,
		isLoading,
		error: queryError
	} = useQuery<GetDevelopDTO[]>({
		queryKey: ['developers'],
		queryFn: async () => {
			const response = await makeApiCall<GetDevelopDTO[]>({
				endpoint: '/Developer'
			})
			return response
		}
	})

	if (isLoading) {
		return <div>Cargando desarrolladores...</div>
	}

	if (queryError) {
		return <div>Error al cargar los desarrolladores: {queryError.message}</div>
	}

	return (
		<div>
			<span className="block text-sm font-medium text-white mb-1">{label}</span>
			<GCSelect
				control={control}
				options={[
					{ id: -1, name: 'Seleccione un desarrollador' },
					...(data?.map((dev) => ({ id: dev.id, name: dev.name })) || [])
				]}
				placeholder="Seleccione un desarrollador"
				register={register}
				className="w-full"
				label={label}
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
		</div>
	)
}
