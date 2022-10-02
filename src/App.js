import React, { useState } from "react";
import "./App.css";
import axios from "axios";
const url = process.env.REACT_APP_URL;
// Instead of running "npm start" directly, we run 'bash start.sh',
// which will pass in the env variables for us. This means an agent
// could get the address dynamically, and pass it to react via
// this bash script. Otherwise we would need to embed the address directly
// into the app itself.
//const url = process.env.REACT_APP_URL || "http://localhost:50000";

export const Mainpage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Button text="Get message" message={() => getMessage()} />
          <Button text="Reset board" message={() => resetBoard()} />
        </div>
        <p />
        <Board />
      </header>
    </div>
  );
};
const Board = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
      }}
    >
      <Button tile="1" />
      <Button tile="2" />
      <Button tile="3" />
      <br />
      <Button tile="4" />
      <Button tile="5" />
      <Button tile="6" />
      <br />
      <Button tile="7" />
      <Button tile="8" />
      <Button tile="9" />
    </div>
  );
};
const makeMove = (tile, text, setText) => {
  console.log("Tile: " + tile);
  setText(text == "X" ? "O" : "X");
};
const getMessage = async () => {
  const response = await axios.get(url + "/getMessage", {
    headers: { "Content-Type": "application/json" },
  });
  console.log(response.data.updated);
};
const resetBoard = async () => {
  await axios.put(url + "/resetBoard", {});
};
const changeMessage = async (e) => {
  await axios.put(url + "/putMessage", {
    message: e,
  });
};
const Button = (props) => {
  // useState returns an array of size 2, with a default value + an updating function
  // ... we assign this value to text and setText
  const [text, setText] = useState(props.text);
  const [tile, setTile] = useState(props.tile);
  return (
    <button
      style={{
        width: "100px",
        height: "100px",
        verticalAlign: "top",
        margin: "5px",
      }}
      onClick={() => {
        makeMove(tile, text, setText);
      }}
    >
      {text}
    </button>
  );
};
