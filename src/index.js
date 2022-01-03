import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GeminiGameReactComponent from "./view/react/game_component.jsx";

const level = window.location.hash.match(/[#&]level=(\d+)|/)[1];
const hook = document.querySelector("gemini-game");
ReactDOM.render(<GeminiGameReactComponent level={level} />, hook);
