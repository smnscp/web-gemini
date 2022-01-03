import GameComponent from "./view/web/game_component.js";

customElements.define("gemini-game", GameComponent, { extends: "div" });

const level = window.location.hash.match(/[#&]level=(\d+)|/)[1];
const game = document.querySelector("gemini-game");
game.setAttribute("level", level);
