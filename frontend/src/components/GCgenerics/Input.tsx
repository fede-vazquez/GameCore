import { Form } from 'radix-ui'
import type { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'
import type { FieldError } from 'react-hook-form'
import { ErrorInputParagraph } from './input/errorText'
import { InputPassword, type InputPasswordProps } from './input/inputPassword'

interface InputProps extends InputPasswordProps {
	formFieldName: string
	classInput?: string
	error?: FieldError | undefined
	children?: ReactNode
	label?: string
	type: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>['type']
}

export function GCInput({
	formFieldName,
	classInput,
	className,
	isDisabled = false,
	error,
	register,
	children,
	label,
	type,
	placeholder,
	isRequired
}: InputProps) {
	const INPUT_CLASSNAME = `border border-zinc-600 rounded-lg py-2 pl-10 pr-10 ${classInput}  w-full ${error != null ? 'border-red-500!' : ''}`
	return (
		<Form.Field className={`flex flex-col gap-y-1 ${className}`} name={formFieldName}>
			<Form.Label className="text-zinc-300 font-semibold">{label}</Form.Label>

			<span className="relative">
				{children}
				<div
					className="after:content-[''] after:absolute after:w-px after:h-[70%] after:bottom-[15%] after:left-[34px] after:bg-zinc-600
                    "
				/>
				<Form.Control asChild>
					{type === 'password' ? (
						<InputPassword
							className={INPUT_CLASSNAME}
							register={register}
							placeholder={placeholder}
							isRequired={isRequired}
							isDisabled={isDisabled}
						/>
					) : (
						<input
							{...(!register && { register })}
							className={`${INPUT_CLASSNAME}`}
							type={type}
							placeholder={placeholder}
							{...(isRequired && { required: true })}
							disabled={isDisabled}
						/>
					)}
				</Form.Control>
			</span>
			{error && <ErrorInputParagraph message={error.message} />}
		</Form.Field>
	)
}
