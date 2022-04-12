// interface ValueProps를 추가하고 Square Component에 제너릭을 추가하였다.
// Square의 {this.props.value}와 Board의 renderSqure의 오류가 사라졌다.
interface SquareProps {
  value: string;
  onClick: () => void;
}

export function Square(props: SquareProps) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
