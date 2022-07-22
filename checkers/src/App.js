import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
//const dotenv = require('dotenv-webpack');
const url = process.env.url || "http://localhost:50000";

//console.log(process?.env)
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => login()}>Click button to call API</button>
      </header>
    </div>
  );
}
function login() {
  let response = axios
    .get(url + "/hey", {
      headers: { "Content-Type": "application/json" },
      params: { param1: "abc" },
    })
    .then((response) => {
      console.log(response?.data);
    });
}

export default App;
