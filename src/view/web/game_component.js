import Game from "../../model/game.js";
import RingComponent from "./ring_component.js";
import NavComponent from "./nav_component.js";

customElements.define("gemini-ring", RingComponent);
customElements.define("gemini-nav", NavComponent);

export default class GameComponent extends HTMLElement {
  static get observedAttributes() {
    return ["level"];
  }

  constructor() {
    super();
    this.game = new Game();
    this.navComp = document.createElement("gemini-nav");
    this.navComp.game = this.game;
    this.ringComp = document.createElement("gemini-ring");
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
    this.className = `length-${this.game.ring.length}`;

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
