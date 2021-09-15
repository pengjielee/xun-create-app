import * as React from "react";

interface IProps {
  text?: string;
}

const Counter: React.FC<IProps> = (props) => {
  const [count, setCount] = React.useState(1);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default Counter;
