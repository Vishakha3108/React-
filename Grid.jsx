import { useState } from "react";
import Card from "../Card/Card";
import './Grid.css';

function isWinner(board, symbol, gridSize = 3) {
  const rows = Array.from({ length: gridSize }, (_, i) => i * gridSize);
  const columns = Array.from({ length: gridSize }, (_, i) => i);
  const diagonals = [
    Array.from({ length: gridSize }, (_, i) => i * (gridSize + 1)),
    Array.from({ length: gridSize }, (_, i) => (i + 1) * (gridSize - 1)),
  ];

  const lines = [
    ...rows.map(r => Array.from({ length: gridSize }, (_, i) => r + i)),
    ...columns.map(c => Array.from({ length: gridSize }, (_, i) => c + i * gridSize)),
    ...diagonals,
  ];

  return lines.some(line => line.every(idx => board[idx] === symbol)) ? symbol : null;
}

function Grid({ numberOfCards }) {
  const gridSize = Math.sqrt(numberOfCards);
  const [turn, setTurn] = useState(true);
  const [board, setBoard] = useState(Array(numberOfCards).fill(""));
  const [winner, setWinner] = useState(null);

  function play(index) {
    if (board[index] !== "" || winner) return;

    const updatedBoard = [...board];
    updatedBoard[index] = turn ? "O" : "X";
    const win = isWinner(updatedBoard, turn ? "O" : "X", gridSize);

    if (win) {
      setWinner(win);
    } else {
      setBoard(updatedBoard);
      setTurn(!turn);
    }
  }

  function reset() {
    setBoard(Array(numberOfCards).fill(""));
    setWinner(null);
    setTurn(true);
  }

  return (
    <div className="grid-wrapper">
      {winner && (
        <>
          <h1 className="turn-highlight">Winner is {winner}</h1>
          <button className="reset" onClick={reset}>Reset Game</button>
        </>
      )}
      {!winner && <h1 className="turn-highlight">Current Turn: {turn ? "O" : "X"}</h1>}
      <div className="grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {board.map((value, idx) => (
          <Card onPlay={() => play(idx)} player={value} key={idx} index={idx} />
        ))}
      </div>
    </div>
  );
}

export default Grid;
