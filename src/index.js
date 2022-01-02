import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GeminiGameReactComponent from "./view/react/game_component";

const level = window.location.hash.match(/[#&]level=(\d+)|/)[1];
const hook = document.querySelector("#gemini_game_container");
ReactDOM.render(<GeminiGameReactComponent level={level} />, hook);
