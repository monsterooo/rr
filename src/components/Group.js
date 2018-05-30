import Konva from 'konva';
import Layer from './Layer';
import * as PIXI from "pixi.js";

class Group extends Layer {
  constructor(props, parent) {
    super();
    this.props = props;
    this.node = new PIXI.Container();
    debugger;
    this.applyLayerProps(props);
    debugger;
    parent.addChild(this.node);
    console.log('Group parent > ', parent);
  }
  render() {
    return null;
  }
}

export default Group;