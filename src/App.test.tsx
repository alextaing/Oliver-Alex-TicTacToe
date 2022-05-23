import { fireEvent, getAllByRole, render, screen } from '@testing-library/react';
import { click } from '@testing-library/user-event/dist/click';
import exp from 'constants';
import App from './App';

it('Basic Test for Title', () => {
  render(<App />);
  const title = screen.getByText("Oshi v. Alex");
  expect(title).toBeInTheDocument();
});

it("Player A clicks one cell", () => {
  render(<App />);
  clickSquares([0]);

  const playerAMove = screen.getByRole('button', { name: "A" });
  const nextPlayer = screen.getByText("Next player: Oliver");

  expect(playerAMove).toBeInTheDocument();
  expect(nextPlayer).toBeInTheDocument();
});

it("Each player clicks on a different cell", () => {
  render(<App />);
  clickSquares([0, 1]);

  const playerAMove = screen.getAllByRole('button', { name: "A" })
  const playerOMove = screen.getAllByRole('button', { name: "O" })
  const nextPlayer = screen.getByText("Next player: Alex");

  expect(playerAMove[0]).toBeInTheDocument();
  expect(playerOMove[0]).toBeInTheDocument();
  expect(playerAMove.length).toBe(1);
  expect(playerOMove.length).toBe(1);
  expect(nextPlayer).toBeInTheDocument();

});

it("Both players click on the same cell", () => {
  render(<App />);
  clickSquares([0, 0]);

  const playerAMove = screen.getAllByRole('button', { name: "A" });
  const playerOMove = screen.queryAllByRole('button', { name: "O" });

  expect(playerAMove[0]).toBeInTheDocument();
  expect(playerAMove.length).toBe(1);
  expect(playerOMove.length).toBe(0);
});

it("Player A wins (AAA across top row)", () => {
  render(<App />);
  clickSquares([0, 3, 1, 4, 2]);

  const playerAMove = screen.getAllByRole('button', { name: "A" });
  const playerOMove = screen.queryAllByRole('button', { name: "O" });
  const winMessage = screen.getByText("Alex Wins! :)");

  expect(playerAMove.length).toBe(3);
  expect(playerOMove.length).toBe(2);
  expect(winMessage).toBeInTheDocument();
});

it("Player O wins (OOO diagonally top left to bottom right)", () => {
  render(<App />);
  clickSquares([1, 0, 2, 4, 7, 8]);

  const playerAMove = screen.getAllByRole('button', { name: "A" });
  const playerOMove = screen.queryAllByRole('button', { name: "O" });
  const winMessage = screen.getByText("Oliver Wins... :/");

  expect(playerAMove.length).toBe(3);
  expect(playerOMove.length).toBe(3);
  expect(winMessage).toBeInTheDocument();
});

it("Stop receiving input after win", () => {
  render(<App />);
  clickSquares([1, 0, 2, 4, 7, 8, 3]);

  const playerAMove = screen.getAllByRole('button', { name: "A" });
  const playerOMove = screen.queryAllByRole('button', { name: "O" });

  expect(playerAMove.length).toBe(3);
  expect(playerOMove.length).toBe(3);
});

it("Test \"Go to game start\" button after win", () => {
  render(<App />);
  clickSquares([1, 0, 2, 4, 7, 8]);

  const playerAMove = screen.getAllByRole('button', { name: "A" });
  const playerOMove = screen.queryAllByRole('button', { name: "O" });
  const winMessage = screen.getByText("Oliver Wins... :/");

  expect(playerAMove.length).toBe(3);
  expect(playerOMove.length).toBe(3);
  expect(winMessage).toBeInTheDocument();

  const rewindToStart = screen.getByRole('button', { name: "Go to game start" })
  fireEvent.click(rewindToStart);

  const playerAMoveAfterReset = screen.queryAllByRole('button', { name: "A" })
  const playerOMoveAfterReset = screen.queryAllByRole('button', { name: "O" })
  const winMessageAfterReset = screen.queryByText("Oliver Wins... :/");
  const goToMove1 = screen.queryByText("Go to move #1");

  expect(playerAMoveAfterReset.length).toBe(0);
  expect(playerOMoveAfterReset.length).toBe(0);
  expect(winMessageAfterReset).toBeNull();
  expect(goToMove1).toBeNull();
});

function clickSquares(squares: number[]) {
  const TTTBoard = screen.getAllByRole('button');
  for (var square of squares) {
    fireEvent.click(TTTBoard[square]);
  }
}



