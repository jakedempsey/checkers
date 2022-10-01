import React from "react";
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
        <p>Button here</p>
        <Button text="Get message" message={() => getMessage()} />
        <Button text="HEY YOU" message={() => changeMessage("HEY YOU")} />
        <Button text="OUT THERE" message={() => changeMessage("OUT THERE")} />
      </header>
    </div>
  );
};
const getMessage = async () => {
  const response = await axios.get(url + "/getMessage", {
    headers: { "Content-Type": "application/json" },
  });
  console.log(response.data.updated);
};
const changeMessage = async (e) => {
  const message = await axios.put(url + "/putMessage", {
    message: e,
  });
  return <div>{message}</div>;
};
const Button = (props) => {
  return <button onClick={props.message}>{props.text}</button>;
};
