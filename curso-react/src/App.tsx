import React from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";

function App() {
  return (
    <>
      <Header title="pagina Inicial" />
      <h1>Hello Word</h1>
      <Menu>
        <ul>
          <li>Home</li>
          <li>Contact</li>
          <li>About</li>
        </ul>
      </Menu>
    </>
  );
}

export default App;
