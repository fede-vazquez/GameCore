import { Link } from 'wouter'

export function Footer() {
	return (
		<footer className="flex flex-col justify-center items-center p-4 border-t border-neutral-800">
			<div className="flex flex-row items-center justify-center gap-2">
				<p className="text-neutral-400">Copyright &copy; {new Date().getFullYear()} </p>
				<Link href="/" className="text-primaryWhite hover:text-primaryBlue transition-colors duration-75">
					GameCore
				</Link>
			</div>
		</footer>
	)
}
