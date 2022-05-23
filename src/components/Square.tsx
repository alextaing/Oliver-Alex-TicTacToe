/**
 * Props for {@link Square}
 */
interface SquareProps {
	/** 
	 * The value of the square (i.e the person who has clicked on 
	 * that square)
	 * A: Alex, O: Oliver, null: unclicked
	 */
	value: string,
	/** A function describing the actions of the square once clicked */
	onClick: () => void,
}

/**
 * Square component
 */
export default function Square(props: SquareProps) {
	return (
		<button
			className="square"
			onClick={props.onClick}
		>
			{props.value}
		</button>
	);
}
