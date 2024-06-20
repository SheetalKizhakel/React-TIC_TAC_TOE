import React from 'react';
import { useState } from 'react';


//first map() iterates over each row since map is called on every item of the calling datastructure(here a 2d array so every element of it is an array itself) and creates a list item for every row 
//second map() iterates over each cell which should be clickable in current row(here the calling a datastructure is an array) and creates a list item for every cell
//it is iterated row wise
export default function GameBoard({onSelectSquare,board}) {
    //clearly we want the the gameboard to update based on what was clicked. so again we need state
/*const [gameBoard,setGameBoard]=useState(initialGameBoard);
//this function is triggered when a square is clicked and will accordingly update the square with either o or x depending on which player clicked
//for this we need to pass the rowindex,colindex
function handleSelectSquare(rowIndex,colIndex)
{
    //use this way whenever we want to update the sate of array or object
    setGameBoard((prevGameBoard)=>{
        const updatedBoard=[...prevGameBoard.map((innerArray)=>[...innerArray])];//since its nested when we use spread only the array will be spread to get hold of element inside array we use map
        updatedBoard[rowIndex][colIndex]=activePlayerSymbol;
        return updatedBoard;
    });

    //onSelectSquare=we're executing a function thats defined outside of the gameboard component(handleSelectSquare) in the App.js, from inside the gameboard component
    onSelectSquare();
}*/
 
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol!==null?true:false}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
