export function PopUp({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<div className={`h-screen z-10 absolute w-screen top-0 left-0 bg-black/50 flex items-center justify-center `}>
			<div className={`p-4 bg-black ${className}`}>{children}</div>
		</div>
	)
}
