import * as React from "react";

interface IProps {
  name: string;
  age: number;
}

const Intro: React.FC<IProps> = ({ name, age }) => (
  <div>
    My name is {name}. I'm {age} years old.
  </div>
);

export default Intro;
