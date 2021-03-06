import { Board } from './Board';
import React, { useState } from 'react';

export function Game() {
  const [historyState, setHistory] = useState<{ squares: string[] }[]>([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  // Board Comopnent로부터 옮겨왔다.
  const handleClick = (i: number) => {
    // 기록
    const history = historyState.slice(0, stepNumber + 1);
    // 현재
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // 승자가 결정된다면 클릭을 방지시킨다.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';

    setHistory(history.concat([{ squares: squares }]));
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  };

  // 턴 넘기기
  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  console.log(historyState);
  const history = historyState;
  // console.log(history);
  // 현재상태
  const current = history[stepNumber];
  // console.log(current);
  // 승자
  const winner = calculateWinner(current.squares);
  const moves = history.map((step, move) => {
    const desc = move
      ? // 초석으로 돌아가기 버튼
        'Go to move #' + move
      : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  let status: string;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    if (current.squares.every((s) => s != null)) {
      status = 'Draw';
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          // 게임의 현재 진행 상태
          squares={current.squares}
          onClick={(i: number) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// 승자 결정 함수
function calculateWinner(squares: string[]): string {
  // 승리 조건
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
  return '';
}
