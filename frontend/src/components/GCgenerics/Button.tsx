import type { ReactNode } from 'react'

const THEMES = {
	PRIMARY: 'primary',
	SECONDARY: 'secondary',
	GHOST: 'ghost'
} as const

const props: Record<GCButtonProps['theme'], string> = {
	ghost: 'bg-transparent border-1!',
	primary: 'bg-primaryBlue border-blue-400/30 ',
	secondary: 'bg-[#a3a3a3] border-[#a3a3a3]'
}

interface GCButtonProps {
	theme: (typeof THEMES)[keyof typeof THEMES]
	children: ReactNode
	title?: string
	className?: string
	disabled?: boolean
}

// use radix ui primitive???
export function GCButton({ theme, children, className, title, disabled }: GCButtonProps) {
	return (
		<button
			disabled={disabled}
			title={title}
			className={`
				rounded-md px-4 py-2 border-2 cursor-pointer hover:brightness-90
				${props[theme]}
			${className}
		`}
		>
			{children}
		</button>
	)
}
