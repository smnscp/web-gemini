import { createRoot } from 'react-dom/client';
import GameComponent from "./view/react/game_component.jsx";

const level = window.location.hash.match(/[#&]level=(\d+)|/)[1];
const game = createRoot(document.querySelector("#game-container"));
game.render(<GameComponent level={level} />);
