export function PopUp({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-screen absolute w-screen top-0 left-0 bg-black/50 flex items-center justify-center">
			<div className="p-4 bg-black">{children}</div>
		</div>
	)
}
