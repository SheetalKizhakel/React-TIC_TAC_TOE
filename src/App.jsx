import React, { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// ALL POSSIBLE WINNING COMBINATIONS
const WINNING_COMBINATIONS = [
  [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ],
  [
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
  ],
  [
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 0 },
    { row: 2, col: 0 },
  ],
  [
    { row: 0, col: 1 },
    { row: 1, col: 1 },
    { row: 2, col: 1 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 2 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 1 },
    { row: 2, col: 0 },
  ],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  // Derive the current player using gameTurns state
  let currentPlayer = gameTurns.length % 2 === 0 ? 'X' : 'O';

  // Create the game board based on turns
  let gameBoard = initialGameBoard.map(row => [...row]);
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  // Determine the winner
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
      break;
    }
  }

  const draw = gameTurns.length === 9 && !winner;

  // Function to handle selecting a square
  function handleSelectSquare(rowIndex, columnIndex) {
    if (gameBoard[rowIndex][columnIndex] || winner) {
      return; // Square is already occupied or the game is over
    }
    setGameTurns(prevTurns => {
      const currentPlayer = prevTurns.length % 2 === 0 ? 'X' : 'O';
      const updatedTurns = [{ square: { row: rowIndex, col: columnIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    });
  }

  // Function to handle restarting the game
  function handleRematch() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player1" symbol="X" isActive={currentPlayer === 'X'} />
          <Player name="Player2" symbol="O" isActive={currentPlayer === 'O'} />
        </ol>
        {(winner || draw) && <GameOver winner={winner} onRematch={handleRematch} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
