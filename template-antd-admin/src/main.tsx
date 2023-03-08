import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import Layout from "@/layout";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Layout />
    </HashRouter>
  </React.StrictMode>
);
