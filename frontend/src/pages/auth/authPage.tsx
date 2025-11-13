import { FUN_FACTS_STRINGS } from '@/utils'
import { Tabs } from 'radix-ui'
import { LogInForm, RegisterForm, TABS_PAGES, type ALL_TABS_PAGES } from './components'
import { useAuthContext } from './context'

const tabsClass = 'border-b-2 px-1 border-b-neutral-300'
const SVG_CLASS = 'absolute left-1.5 top-2 *:text-zinc-500'

export function AuthPage() {
	//todo: there's a isPending prop, use it as a spinner/throbber
	const { setActiveTab, activeTab, error } = useAuthContext()

	return (
		<section className="w-screen h-screen flex justify-center items-center gap-5 p-10 overflow-hidden">
			<Tabs.Root
				onValueChange={(val) => setActiveTab(val as ALL_TABS_PAGES)}
				value={activeTab}
				className="flex flex-col gap-7 border border-zinc-800 border-t-zinc-700 bg-darkFGAlt py-5 px-8 rounded-lg shadow-xl shadow-neutral-900
				h-full p-20 md:p-6 min-w-[50%] justify-center items-center relative"
			>
				<img src="/logo.webp" alt="GameCore Logo" className="absolute w-40 top-7 left-7" />
				<Tabs.List className="flex justify-evenly text-xl gap-4 md:gap-10 font-semibold">
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
					<LogInForm SVG_CLASS={SVG_CLASS} />
				</Tabs.Content>
				<Tabs.Content className="min-h-[500px] max-w-[450px]" value={TABS_PAGES.REGISTER}>
					<RegisterForm SVG_CLASS={SVG_CLASS} />
				</Tabs.Content>
				<p
					className={`absolute bottom-5
				 flex flex-col justify-center items-center text-center text-sm ${error ? ' text-red-500 font-bold text-lg!' : 'text-neutral-500'}`}
				>
					{error != null ? error.message : FUN_FACTS_STRINGS[Math.floor(Math.random() * FUN_FACTS_STRINGS.length)]}
				</p>
			</Tabs.Root>

			{/* random game image to alternate from the assets or /public */}
			<img
				src="/fallback_image.png"
				className="hidden md:inline-block w-full h-full object-cover rounded-md shadow-xl shadow-neutral-900"
			/>
		</section>
	)
}
