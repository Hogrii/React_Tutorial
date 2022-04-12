import { Board } from './Board';
import React from 'react';

interface GameState {
  history: { squares: string[] }[];
  stepNumber: number;
  xIsNext: boolean;
}

// Game 클래스형 컴포넌트
export class Game extends React.Component<{}, GameState> {
  constructor() {
    super({});
    this.state = {
      // 시간 여행 파트
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      // 진행 턴 수
      stepNumber: 0,
      xIsNext: true,
    };
  }

  // Board Comopnent로부터 옮겨왔다.
  handleClick(i: number) {
    // 기록
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // 현재
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // 승자가 결정된다면 클릭을 방지시킨다.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      // 턴이 지날때마다 배열에 추가하기 위해 concat()을 사용
      // push()는 기존 배열에 영향을 미치지만 concat()은 영향을 미치지 않는다.
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      // 사각형을 누르면 +1
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  // 턴 넘기기
  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    console.log(this.state.history);
    const history = this.state.history;
    // console.log(history);
    // 현재상태
    const current = history[this.state.stepNumber];
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
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
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
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            // 게임의 현재 진행 상태
            squares={current.squares}
            onClick={(i: number) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
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
