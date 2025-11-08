import { EyesClosedSVG, EyesOpenSVG } from '@/assets'
import { useState } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

export interface InputPasswordProps {
	register: UseFormRegisterReturn<any>
	className?: string
	placeholder?: string
	isRequired?: boolean
}

const EYES_CLASSNAME = 'absolute top-2 right-2 cursor-pointer hover:scale-110 transition-all'
export function InputPassword({ className, register, placeholder, isRequired }: InputPasswordProps) {
	const [seePassword, SetSeePassword] = useState<boolean>(false)

	return (
		<>
			<span className="relative flex">
				<input
					{...register}
					className={`pr-10! ${className}`}
					type={!seePassword ? 'password' : 'text'}
					placeholder={placeholder}
					{...(isRequired && { required: true })}
				/>

				{seePassword ? (
					<EyesOpenSVG className={EYES_CLASSNAME} onClick={() => SetSeePassword(false)} />
				) : (
					<EyesClosedSVG className={EYES_CLASSNAME} onClick={() => SetSeePassword(true)} />
				)}
			</span>
		</>
	)
}
