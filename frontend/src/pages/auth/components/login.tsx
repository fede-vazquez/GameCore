import { LockSVG, UserSVG } from '@/assets'
import { GCButton } from '@/components/GCgenerics'
import { Form } from 'radix-ui'
import { Link } from 'wouter'
import { InputLayout } from './inputs'
import { SaludationText } from './saludationText'

const FIELDS_FORM = {
	USERNAME: 'username',
	PASSWORD: 'password'
} as const

const SVG_CLASS = 'absolute left-1.5 top-2 *:text-zinc-500'

export function LogInForm() {
	return (
		<Form.Root
			onSubmit={(e) => {
				e.preventDefault()
				alert('yay')
			}}
			className="flex flex-col gap-3"
		>
			<SaludationText
				title="Welcome Again!"
				paragraph="New games have been added since your last visit. Check them out!"
			/>

			<InputLayout formFieldName={FIELDS_FORM.USERNAME} label="Username" type="text" placeholder="Jane Doe" isRequired>
				<UserSVG className={SVG_CLASS} />
			</InputLayout>

			<InputLayout
				formFieldName={FIELDS_FORM.PASSWORD}
				label="Password"
				type="password"
				placeholder="Password"
				isRequired
			>
				<LockSVG className={SVG_CLASS} />
			</InputLayout>

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
