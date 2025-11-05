import { Tabs } from 'radix-ui'
import { useState } from 'react'
import { LogInForm, RegisterForm } from './components'

const TABS_PAGES = {
	LOGIN: 'LogIn',
	REGISTER: 'Register'
} as const

const tabsClass = 'border-b-2 px-1 border-b-neutral-300'
export function AuthPage() {
	const [activeTab, setActiveTab] = useState<(typeof TABS_PAGES)[keyof typeof TABS_PAGES]>(TABS_PAGES.LOGIN)

	return (
		<section className="w-screen h-screen flex justify-center items-center gap-5 p-10 overflow-hidden">
			<Tabs.Root
				onValueChange={(val) => setActiveTab(val as (typeof TABS_PAGES)[keyof typeof TABS_PAGES])}
				defaultValue={TABS_PAGES.LOGIN}
				className="flex flex-col gap-5 border border-zinc-800 border-t-zinc-700 bg-darkFGAlt py-5 px-8 rounded-lg shadow-xl shadow-neutral-900
				h-full min-w-[50%] justify-center items-center relative"
			>
				<img src="/generic_logo.png" alt="GameStore Logo" className="absolute w-56 top-7 left-7" />
				<Tabs.List className="flex justify-evenly text-xl gap-5 font-semibold">
					<Tabs.Trigger
						aria-label="Access to your account"
						className={`${activeTab === TABS_PAGES.LOGIN && tabsClass}`}
						value={TABS_PAGES.LOGIN}
					>
						{TABS_PAGES.LOGIN}
					</Tabs.Trigger>
					<Tabs.Trigger
						aria-label="Register for the first time"
						className={`${activeTab === TABS_PAGES.REGISTER && tabsClass}`}
						value={TABS_PAGES.REGISTER}
					>
						{TABS_PAGES.REGISTER}
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content className="min-h-[500px] max-w-[450px]" value={TABS_PAGES.LOGIN}>
					<LogInForm />
				</Tabs.Content>
				<Tabs.Content className="min-h-[500px] max-w-[450px]" value={TABS_PAGES.REGISTER}>
					<RegisterForm />
				</Tabs.Content>

				<h4
					className="absolute bottom-5
				 flex flex-col justify-center items-center text-pretty text-sm text-neutral-500"
				>
					Fun Fact of the day:
					<p>Coding Bugs were NOT named after an actual bug.</p>
				</h4>
			</Tabs.Root>

			{/* random game image to alternate from the assets or /public */}
			<img src="/fallback_image.png" className="w-full h-full object-cover rounded-md" />
		</section>
	)
}
