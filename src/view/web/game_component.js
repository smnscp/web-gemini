import Game from "../../model/game.js";
import RingComponent from "./ring_component.js";
import NavComponent from "./nav_component.js";

customElements.define("gemini-ring", RingComponent, { extends: "div" });
customElements.define("gemini-nav", NavComponent, { extends: "nav" });

export default class GameComponent extends HTMLDivElement {
  static get observedAttributes() {
    return ["level"];
  }

  constructor() {
    super();
    this.game = new Game();
    this.navComp = document.createElement("nav", { is: "gemini-nav" });
    this.navComp.game = this.game;
    this.ringComp = document.createElement("div", { is: "gemini-ring" });
    this.ringComp.onMove = (edge) => this.trackMove(edge);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "level":
        this.game.initGame(+newValue);
        this.reload();
        break;
    }
  }

  connectedCallback() {
    this.appendChild(this.navComp);
  }

  reload() {
    this.className = `gemini-game gemini-game-${this.game.ring.length}`;

    if (this.ringComp.isConnected) this.removeChild(this.ringComp);
    this.ringComp.ring = this.game.ring;
    this.prepend(this.ringComp);

    this.navComp.updateState();
  }

  trackMove(edge) {
    this.game.trackMove(edge);
    this.navComp.updateState();
    this.ringComp.updateState();
  }
}
