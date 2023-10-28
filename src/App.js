import React, { useState } from "react";

//LOGIKA
/*
1. initial : useState (X)
2. misal X pilih salah satu square(i) menggunakan button
3. square(i) terisi dan button berubah menjadi huruf X
4. calculateStatus mengecek apakah ada yang menang/seri(render), else: pemain selanjutnya
5. calculateNextValue mengecek jika X genap maka useState(O)
6. pemain selanjutnya (O) memilih square
7. loop
*/
const GameContext = React.createContext();
function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextValue, setNextValue] = useState("X");
  const [winner, setWinner] = useState(null);

  function selectSquare(square) {
    if (squares[square] || winner) return;

    const newSquares = [...squares];
    newSquares[square] = nextValue;
    setSquares(newSquares);

    const newWinner = calculateWinner(newSquares);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setNextValue(calculateNextValue(newSquares));
    }
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNextValue("X");
    setWinner(null);
  }

  function renderSquare(i) {
    return (
      <button className="square layer4 rounded-md" onClick={() => selectSquare(i)}>
        <div className="">{squares[i]}</div>
      </button>
    );
  }

  return (
    <div className="layer2 rounded-xl w-40 shadow-xl">
      <div
        className="
          layer3-title flex justify-center items-center font-bold 
          text-shadow-md bg-opacity-30 bg-white rounded-t-xl"
      >
        {calculateStatus(winner, squares, nextValue)}
      </div>
      <div className="button">
        <div className="layer3-buttonrow">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="layer3-buttonrow">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="layer3-buttonrow">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="restart mt-8 flex justify-center ">
        <button className="rounded p-1" onClick={restart}>Restart</button>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="layer1 flex  justify-center items-center h-screen">
      <Board className="" />
    </div>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

function calculateWinner(squares) {
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

function App2() {
  return (
    <GameContext.Provider value={{}}>
      <Game />
    </GameContext.Provider>
  );
}

export default App2;
