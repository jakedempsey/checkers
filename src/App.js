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
  const [player, setPlayer] = useState("X");
  const playerObject = { player: player, setPlayer: setPlayer };
  return (
    <div
      style={{
        backgroundColor: "white",
      }}
    >
      <Button pos="1" playerObject={playerObject} />
      <Button pos="2" playerObject={playerObject} />
      <Button pos="3" playerObject={playerObject} />
      <br />
      <Button pos="4" playerObject={playerObject} />
      <Button pos="5" playerObject={playerObject} />
      <Button pos="6" playerObject={playerObject} />
      <br />
      <Button pos="7" playerObject={playerObject} />
      <Button pos="8" playerObject={playerObject} />
      <Button pos="9" playerObject={playerObject} />
    </div>
  );
};
const makeMove = (tile, setTile, playerObject) => {
  const { pos, value } = tile;
  const { player, setPlayer } = playerObject;
  if (value !== "") {
    return;
  }
  setTile({ pos: pos, value: playerObject.player });
  setPlayer(player == "X" ? "O" : "X");
};
const Button = (props) => {
  const [tile, setTile] = useState({
    pos: props.pos,
    value: "",
  });
  return (
    <button
      style={{
        width: "100px",
        height: "100px",
        verticalAlign: "top",
        margin: "5px",
      }}
      onClick={() => {
        makeMove(tile, setTile, props.playerObject);
      }}
    >
      {tile.value || props.text}
    </button>
  );
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
