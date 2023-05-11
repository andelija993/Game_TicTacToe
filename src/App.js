import { useEffect, useState } from "react";

import Cell from "./components/Cell";

const App = () => {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", "",]);
  const [go, setGo] = useState("circle");
  const [winningMessage, setWinningMessage] = useState(null);

  const message = "it is now " + go + " 's turn! "

  const checkScore = () => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    winningCombos.forEach((arr) => {
      let winningCirclePLayer = arr.every(cell => cells[cell] === "circle");
      let winningCrossPLayer = arr.every(cell => cells[cell] === "cross");

      if (winningCirclePLayer) {
        setWinningMessage("Circle player wins!");
        return;
      } if (winningCrossPLayer) {
        setWinningMessage("Cross player wins!");
        return;
      }

    })
  }

  const handleReset = () => {
    setCells(["", "", "", "", "", "", "", "", "",]);
    setWinningMessage(null);
    setGo("circle");
  }

  useEffect(() => {
    checkScore();
  }, [cells])

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      {winningMessage &&
        <button onClick={handleReset}>New Game</button>}
      <div className="gameboard">
        {cells.map((cell, index) => <Cell
          key={index}
          id={index}
          cell={cell}
          setCells={setCells}
          go={go}
          setGo={setGo}
          cells={cells}
          winningMessage={winningMessage}
        />)}
        <p>{winningMessage || message}</p>
      </div>
    </div>
  );
}

export default App;
