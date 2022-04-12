import React from 'react';
// interface ValueProps를 추가하고 Square Component에 제너릭을 추가하였다.
// Square의 {this.props.value}와 Board의 renderSqure의 오류가 사라졌다.
interface SquareProps {
    value: string;
    onClick: () => void
  }
  /*
  // 초기값이 null, 이후 클릭시 x가 들어가야하기 때문에 any 타입을 부여했다.
  interface SquareStates {
    value: any;
  }
  */
  
  /*
  // index.ts로 만들었을 때 오류가 났지만 확장자를 tsx로 변경하니 오류가 사라졌다.
  // 총 3개(Square, Board, Game)의 컴포넌트로 구성
  class Square extends React.Component<SquareProps, SquareStates>{
    // 생성자를 사용해서 현재의 값을 state에 저장한다.
    constructor(props: SquareProps){
      super(props);
      this.state = {
        // 초기값
        value: null,
      }
    }
      render() {
        return (
          // Square를 클릭했을 때 console.log('click') 추가하였다. -> 'X'가 찍히게 변경
          <button 
          className="square" 
          onClick = {() => this.props.onClick()}
          >
            {this.props.value}
          </button>
        );
      }
    }
  */
  // Square 클래스형 컴포넌트
  export class Square extends React.Component<SquareProps, {}>{
    render(){
      return(
        <button className="square" onClick={this.props.onClick}>
          {this.props.value}
        </button>
      )
    }
  }
