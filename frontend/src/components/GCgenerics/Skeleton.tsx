export function GCSkeleton({ className }: { className?: string }) {
	return (
		<div role="status" className={`animate-pulse ${className}`}>
			<div className="h-full w-full rounded-xl bg-gray-600 dark:bg-gray-800 opacity-40" />
		</div>
	)
}
