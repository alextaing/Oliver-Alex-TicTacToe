import Square from "./Square"

/**
 * Props for {@link Board}
 */
interface BoardProps {
  /** 
   * Array 1x9 representing an instance of a TTT board, reading
   * from left to right, top to bottom. 
   */
  squares: string[],
  /** 
   * A function describing how the board will handle a click on a given
   * cell where i represents the 0 indexed cell location.
   */
  onClick: (i: number) => void;
}


/**
 * Board component 
 */
export default function Board(props: BoardProps) {
  function renderSquare(i: number) {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}