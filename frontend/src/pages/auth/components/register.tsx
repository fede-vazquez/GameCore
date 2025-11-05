import { EmailSVG, LockSVG, UserSVG } from '@/assets'
import { GCButton } from '@/components/GCgenerics'
import { Form } from 'radix-ui'
import { InputLayout } from './inputs'
import { SaludationText } from './saludationText'

const FIELDS_FORM = {
	USERNAME: 'username',
	PASSWORD: 'password',
	CONFIRM_PASSWORD: 'confirm_password',
	EMAIL: 'email'
} as const

const SVG_CLASS = 'absolute left-1.5 top-2 *:text-zinc-500'

export function RegisterForm() {
	return (
		<Form.Root
			onSubmit={(e) => {
				e.preventDefault()
				alert('yay')
			}}
			className="flex flex-col gap-3"
		>
			<SaludationText title="New in here?" paragraph="Register for manage your games anytime and anywhere." />

			<InputLayout formFieldName={FIELDS_FORM.USERNAME} label="Username" type="text" placeholder="Jane Doe" isRequired>
				<UserSVG className={SVG_CLASS} />
			</InputLayout>

			<InputLayout formFieldName={FIELDS_FORM.EMAIL} label="Email" type="email" placeholder="abc@def.com" isRequired>
				<EmailSVG className={SVG_CLASS} />
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

			<InputLayout
				formFieldName={FIELDS_FORM.CONFIRM_PASSWORD}
				label="Confirm Password"
				type="password"
				placeholder="Password"
				isRequired
			>
				<LockSVG className={SVG_CLASS} />
			</InputLayout>

			<Form.Submit asChild className="mt-3">
				<GCButton theme="primary">Register</GCButton>
			</Form.Submit>
		</Form.Root>
	)
}
