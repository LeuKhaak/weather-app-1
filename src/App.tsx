import React from "react";
import Weather from "./components/templates/Weather";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Weather />
      </div>
    </BrowserRouter>
  );
}

export default App;
