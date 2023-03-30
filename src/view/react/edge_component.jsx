import React from "react";

export default class EdgeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const edge = this.props.edge;
    let classes = `seq-${this.props.index + 1} color-${edge.color}`;
    let button;
    if (edge.isMovable()) {
      classes += " movable";
      button = (
        <button onClick={() => edge.move() && this.props.onMove(edge)} />
      );
    }

    return <gemini-edge class={classes}>{button}</gemini-edge>;
  }
}
