interface ErrorInputParagraphProps {
	message: string | undefined
}

export function ErrorInputParagraph({ message }: ErrorInputParagraphProps) {
	return <p className="text-red-400 text-center text-sm">{message ?? 'Unrecognizable error'}</p>
}
