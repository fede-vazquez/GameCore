import { Form } from 'radix-ui'
import type { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'
import { InputPassword, type InputPasswordProps } from './inputPassword'

interface InputProps extends InputPasswordProps {
	formFieldName: string
	children?: ReactNode
	label: string
	type: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>['type']
}

const INPUT_CLASSNAME = 'border border-zinc-600 rounded-lg py-2 px-10 w-full'
export function InputLayout({ formFieldName, children, label, type, placeholder, isRequired }: InputProps) {
	return (
		<Form.Field className="flex flex-col gap-y-1" name={formFieldName}>
			<Form.Label className="text-zinc-300 font-semibold">{label}</Form.Label>

			<span className="relative">
				{children}
				<div
					className="after:content-[''] after:absolute after:w-px after:h-[70%] after:bottom-[15%] after:left-[34px] after:bg-zinc-600
                    "
				/>
				<Form.Control asChild>
					{type === 'password' ? (
						<InputPassword className={INPUT_CLASSNAME} placeholder={placeholder} isRequired={isRequired} />
					) : (
						<input
							className={INPUT_CLASSNAME}
							type={type}
							placeholder={placeholder}
							{...(isRequired && { required: true })}
						/>
					)}
				</Form.Control>
			</span>
		</Form.Field>
	)
}
