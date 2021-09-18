import React from "react";

import warning from "../assets/images/icon-warning.png";

const Home = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img className="icon-warning" src={warning} />
      <span>Home Page</span>
    </div>
  );
};

export default Home;
