import { LockSVG, UserSVG } from '@/assets'
import { GCButton, GCInput } from '@/components/GCgenerics'
import { makeApiCall } from '@/services/apiCall'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'radix-ui'
import { useForm } from 'react-hook-form'
import { Link } from 'wouter'
import z from 'zod'
import type { RegisterAndLoginProps } from '.'
import { SaludationText } from './saludationText'

const FIELDS_FORM = {
	USERNAME: 'username',
	PASSWORD: 'password'
} as const

const loginValidator = z.object({
	[FIELDS_FORM.USERNAME]: z.string().max(16).min(3).nonoptional(),
	[FIELDS_FORM.PASSWORD]: z.string().max(32).min(5).nonoptional()
})

export function LogInForm({ SVG_CLASS, addUser }: RegisterAndLoginProps) {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<z.infer<typeof loginValidator>>({
		resolver: zodResolver(loginValidator)
	})

	return (
		<Form.Root
			onSubmit={handleSubmit(async (e) => {
				const data = await makeApiCall({ httpMethod: 'POST', endpoint: '/auth/login', body: e })
				addUser(data)
			})}
			className="flex flex-col gap-3"
		>
			<SaludationText
				title="Welcome Again!"
				paragraph="New games have been added since your last visit. Check them out!"
			/>

			<GCInput
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
