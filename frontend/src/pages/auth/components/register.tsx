import { EmailSVG, LockSVG, UserSVG } from '@/assets'
import { GCButton, GCInput } from '@/components/GCgenerics'
import type { UserModel } from '@/models'
import { makeApiCall } from '@/services/apiCall'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'radix-ui'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { type RegisterAndLoginProps } from '.'
import { useAuthContext } from '../context'
import { SaludationText } from './saludationText'

const FIELDS_FORM = {
	USERNAME: 'username',
	PASSWORD: 'password',
	CONFIRM_PASSWORD: 'confirmPassword',
	EMAIL: 'email'
} as const

const registerValidator = z
	.object({
		[FIELDS_FORM.USERNAME]: z.string().max(16).min(3).nonoptional(),
		[FIELDS_FORM.PASSWORD]: z.string().max(32).min(5).nonoptional(),
		[FIELDS_FORM.CONFIRM_PASSWORD]: z.string().max(32).min(5).nonoptional(),
		[FIELDS_FORM.EMAIL]: z.email().nonoptional()
	})
	.refine((d) => d[FIELDS_FORM.PASSWORD] === d[FIELDS_FORM.CONFIRM_PASSWORD], {
		path: [FIELDS_FORM.CONFIRM_PASSWORD],
		error: 'Passwords must match'
	})

export function RegisterForm({ SVG_CLASS }: RegisterAndLoginProps) {
	const { startTransition, registerUser, changeTabToLogin, isPending } = useAuthContext()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<z.infer<typeof registerValidator>>({
		resolver: zodResolver(registerValidator)
	})

	return (
		<Form.Root
			onSubmit={handleSubmit((e) => {
				startTransition(async () => {
					const data = await makeApiCall<UserModel>({ httpMethod: 'POST', endpoint: '/auth/register', body: e })
					if (!data) return
					registerUser(data)
					changeTabToLogin()
				})
			})}
			className="flex flex-col gap-3"
		>
			<SaludationText title="New in here?" paragraph="Register for manage your games anytime and anywhere." />

			<GCInput
				isDisabled={isPending}
				error={errors[FIELDS_FORM.USERNAME]}
				register={register(FIELDS_FORM.USERNAME)}
				formFieldName={FIELDS_FORM.USERNAME}
				label="Username"
				type="text"
				placeholder="Jane Doe"
				isRequired
			>
				<UserSVG className={SVG_CLASS} />
			</GCInput>

			<GCInput
				isDisabled={isPending}
				error={errors[FIELDS_FORM.EMAIL]}
				register={register(FIELDS_FORM.EMAIL)}
				formFieldName={FIELDS_FORM.EMAIL}
				label="Email"
				type="email"
				placeholder="abc@def.com"
				isRequired
			>
				<EmailSVG className={SVG_CLASS} />
			</GCInput>

			<GCInput
				isDisabled={isPending}
				error={errors[FIELDS_FORM.PASSWORD]}
				register={register(FIELDS_FORM.PASSWORD)}
				formFieldName={FIELDS_FORM.PASSWORD}
				label="Password"
				type="password"
				placeholder="Password"
				isRequired
			>
				<LockSVG className={SVG_CLASS} />
			</GCInput>

			<GCInput
				isDisabled={isPending}
				error={errors[FIELDS_FORM.CONFIRM_PASSWORD]}
				register={register(FIELDS_FORM.CONFIRM_PASSWORD)}
				formFieldName={FIELDS_FORM.CONFIRM_PASSWORD}
				label="Confirm Password"
				type="password"
				placeholder="Password"
				isRequired
			>
				<LockSVG className={SVG_CLASS} />
			</GCInput>

			<Form.Submit asChild className="mt-3">
				<GCButton theme="primary">Register</GCButton>
			</Form.Submit>
		</Form.Root>
	)
}
