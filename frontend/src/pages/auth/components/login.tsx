import { LockSVG, UserSVG } from '@/assets'
import { GCButton, GCInput } from '@/components/GCgenerics'
import type { LoginModel } from '@/models'
import { makeApiCall } from '@/services/apiCall'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'radix-ui'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'wouter'
import z from 'zod'
import type { RegisterAndLoginProps } from '.'
import { useAuthContext } from '../context'
import { SaludationText } from './saludationText'

const FIELDS_FORM = {
	USERNAME: 'Username',
	PASSWORD: 'Password'
} as const

const loginValidator = z.object({
	[FIELDS_FORM.USERNAME]: z.string().max(16).min(3).nonoptional(),
	[FIELDS_FORM.PASSWORD]: z.string().max(32).min(5).nonoptional()
})

export function LogInForm({ SVG_CLASS }: RegisterAndLoginProps) {
	const { registerUser, isPending, startTransition } = useAuthContext()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<z.infer<typeof loginValidator>>({
		resolver: zodResolver(loginValidator)
	})

	const [_, navigate] = useLocation()

	return (
		<Form.Root
			onSubmit={handleSubmit((e) => {
				startTransition(async () => {
					const data = await makeApiCall<LoginModel>({ httpMethod: 'POST', endpoint: '/auth/login', body: e })

					if (!data?.user) return
					registerUser(data.user)
					navigate('/library')
				})
			})}
			className="flex flex-col gap-3"
		>
			<SaludationText
				title="Welcome Again!"
				paragraph="New games have been added since your last visit. Check them out!"
			/>

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

			<Form.Submit asChild className="mt-3 ">
				<GCButton theme="primary">Log In</GCButton>
			</Form.Submit>
			<h4 className="text-center">
				Forgot password?{' '}
				<Link href="#" className="text-blue-300 underline underline-offset-2 hover:brightness-110">
					Click here
				</Link>
			</h4>
		</Form.Root>
	)
}
