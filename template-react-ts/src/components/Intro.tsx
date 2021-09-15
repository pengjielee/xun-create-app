import React from "react";

interface IProps {
  name: string;
  age: number;
}

const Intro: React.FC<IProps> = ({ name, age }) => (
  <div>
    My name is {name}. I'm {age}.
  </div>
);

export default Intro;
