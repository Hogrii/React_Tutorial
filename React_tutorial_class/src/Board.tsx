import {Square} from './Square';
import React from 'react';

interface BoardProps{
    squares: string[],
    onClick: (i: number) => void,
  }
  /*
  interface BoardStates{
    squares: string[],
    xIsNext: boolean,
  }
  */
  
  // Board 클래스형 컴포넌트
  export class Board extends React.Component<BoardProps, {}> {
    /*
    // Game Component로부터 squares와 onClick을 받게하기 위해 주석처리
    constructor(props: BoardProps){
      super(props);
      this.state = {
        // board판 배열
        squares: Array(9).fill(null),
        xIsNext:true,
      }
    }
    */
    /*
    Board에 있던 Handler -> Game Component로 이사
    // board를 클릭했을 때 square state에 값을 저장하기 위해 만든 메소드
    handleClick(i: number){
      const squares = this.state.squares.slice();
      // 승자가 결정된다면 클릭을 방지시킨다.
      if(calculateWinner(squares)||squares[i]){
        return;
      }
      squares[i] = this.state.xIsNext? 'X':'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }
    */
  
     // i의 타입을 정해주지 않았다는 오류가 발생하여 number을 부여했다.
     // -> squares[i]에는 string type이 들어가기 때문에 SquareProps의 value를 any로 바꾸었다.
    renderSquare(i: number) {
      return <Square 
        value={this.props.squares[i]} 
        onClick = {() => this.props.onClick(i)}
        />
    }
  
    render() {
      /*
      // Game component로 이사
      // 승자 결정 함수로부터 값 받아오기
      const winner = calculateWinner(this.state.squares);
      let status;
      // 승리 조건에 맞춰 승자가 생기면 승자 표시
      if(winner){
        status = 'Winner: ' + winner;
      }else{
        status = 'Next player: ' + (this.state.xIsNext? 'X':'O');
      }
      */
  
      return (
        <div>
            {/* Game Component에서 status를 관리하기 때문에 주석처리           
            <div className="status">{status}</div> */}
            {/* 총 9개의 Square Component가 들어가 있다. */}
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
        </div>
      );
    }
  }