export default class EdgeComponent extends HTMLElement {
  constructor() {
    super();
    this.button = document.createElement("button");
  }

  connectedCallback() {
    this.button.onclick = () => this.edge.move() && this.onMove(this.edge);
    this.updateState();
  }

  updateState() {
    this.className = `seq-${this.index + 1} color-${this.edge.color}`;
    if (this.edge.isMovable()) {
      this.className += " movable";
      this.button.isConnected || this.appendChild(this.button);
    } else {
      this.button.isConnected && this.removeChild(this.button);
    }
    this.className += " " + this.edge.getMoveDirection();
  }
}
