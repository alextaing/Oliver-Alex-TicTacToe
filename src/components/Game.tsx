import { useState } from "react";
import Board from "./Board";

/**
 * Game component
 */
export default function Game() {
  const [history_0, setHistory] = useState([Array(9).fill(null)]);
  const [aIsNext, setaIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const history = history_0.slice(0, stepNumber + 1); // is this OK? it looks wrong.
  const current = history[stepNumber].slice();
  const winner = calculateWinner(current);
  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current}
          onClick={(i: number) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{getStatus()}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );

  function jumpTo(step: number) {
    setStepNumber(step);
    setaIsNext(step % 2 === 0);
  }

  function handleClick(i: number) {
    if (calculateWinner(current) || current[i]) {
      return;
    }
    current[i] = aIsNext ? "A" : "O";
    setHistory(history.concat([current]));
    setStepNumber(stepNumber + 1);
    setaIsNext(!aIsNext);
  }

  function getStatus(): string{
    let status: string;
    if (winner === "O") {
      status = "Oliver Wins... :/";
    } else if (winner === "A") {
      status = "Alex Wins! :)";
    } else {
      status = "Next player: " + (aIsNext ? "Alex" : "Oliver");
    }
    return status;
  }

}

/**
 * Determines who the winner is, if one exists.
 * @param squares A 1x9 array representing a tic-tac-toe board instance
 * @returns The winner as a string if one exists, otherwise null.
 */
function calculateWinner(squares: string[]): string|null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}