import React from "react";
import EdgeComponent from "./edge_component.jsx";

export default class RingComponent extends React.Component {
  render() {
    const inscribed = this.props.ring.inscribed;

    return (
      <gemini-ring>
        <div className="edges">
          {this.props.ring.edges.map((edge, index) => (
            <EdgeComponent
              edge={edge}
              key={index}
              index={index}
              onMove={this.props.onMove}
            />
          ))}
        </div>
        {inscribed && (
          <RingComponent ring={inscribed} onMove={this.props.onMove} />
        )}
      </gemini-ring>
    );
  }
}
