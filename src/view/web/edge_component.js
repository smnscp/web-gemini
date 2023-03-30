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
    this.className = `edge edge-${this.index + 1} color-${this.edge.color}`;
    if (this.edge.isMovable()) {
      this.className += " movable";
      this.button.isConnected || this.appendChild(this.button);
    } else {
      this.button.isConnected && this.removeChild(this.button);
    }
    if (this.edge.color) {
      if (this.edge.isMoved()) {
        this.className += " moved-from-side";
      } else if (this.edge.prev.isMoved()) {
        this.className += " moved-from-prev";
      } else if (this.edge.trunk && this.edge.trunk.isMoved()) {
        if (this.edge.trunk.color) {
          this.className += " moved-from-next-trunk";
        } else {
          this.className += " moved-from-trunk";
        }
      }
    }
  }
}
