import { MenuSVG } from '@/assets'
import { useMenuContext } from '@/context'

export function AsideMenuButton({ className }: { className?: string }) {
	const { setIsMenuActive } = useMenuContext()
	return (
		<span
			className={`
                z-20! bg-neutral-900 p-1 rounded-lg transition-all 
                hover:scale-105 hover:brightness-105 hover:cursor-pointer
				md:pointer-events-none! md:invisible! md:hidden!
				${className}`}
		>
			<MenuSVG onClick={() => setIsMenuActive((prev) => !prev)} />
		</span>
	)
}
