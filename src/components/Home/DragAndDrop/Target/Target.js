import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const targetCode = {
  drop(props, monitor, component) {
    return {
      toTargetId: props.target.id
    };
  }
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    // item: monitor.getItem()
  }
}

class Target extends Component {
  render() {
    const { connectDropTarget, hovered, target } = this.props;
    const backgroundColor = hovered ? '#303f9f' : '#3f51b5';
    return connectDropTarget(
      <div className="target" style={{ backgroundColor }} >
        {target.name}
        {this.props.children}
      </div>);
  }
}

export default DropTarget('type1', targetCode, collect)(Target);
