import EdgeComponent from "./edge_component.js";

customElements.define("gemini-edge", EdgeComponent, { extends: "li" });

export default class RingComponent extends HTMLDivElement {
  constructor() {
    super();
    this.edgeList = document.createElement("ol");
    this.edgeList.className = "edges";
  }

  connectedCallback() {
    this.className = "ring";

    for (let index = 0; index < this.ring.edges.length; ++index) {
      const edgeComp = document.createElement("li", { is: "gemini-edge" });
      edgeComp.edge = this.ring.edges[index];
      edgeComp.index = index;
      edgeComp.onMove = this.onMove;
      this.edgeList.appendChild(edgeComp);
    }
    this.appendChild(this.edgeList);

    const inscribed = this.ring.inscribed;
    if (inscribed) {
      this.inscribedComp = document.createElement("div", { is: "gemini-ring" });
      this.inscribedComp.ring = inscribed;
      this.inscribedComp.onMove = this.onMove;
      this.appendChild(this.inscribedComp);
    } else {
      this.className += " innermost";
    }
  }

  disconnectedCallback() {
    while (this.edgeList.hasChildNodes()) {
      this.edgeList.removeChild(this.edgeList.firstChild);
    }
    while (this.hasChildNodes()) {
      this.removeChild(this.firstChild);
    }
  }

  updateState() {
    let edgeComp = this.edgeList.firstChild;
    while (edgeComp) {
      edgeComp.updateState();
      edgeComp = edgeComp.nextSibling;
    }
    this.inscribedComp && this.inscribedComp.updateState();
  }
}
