import React from "react";
import ReactDOM from "react-dom";
import GameComponent from "./view/react/game_component.jsx";

const level = window.location.hash.match(/[#&]level=(\d+)|/)[1];
const hook = document.querySelector("gemini-game");
ReactDOM.render(<GameComponent level={level} />, hook);
