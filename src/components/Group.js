import Konva from 'konva';
import Layer from './Layer';
import * as PIXI from "pixi.js";

class Group extends Layer {
  constructor(props) {
    super();
    this.props = props;
    // this._canvas = new Konva.Group();
    this._canvas = new Konva.Layer();
    this.applyLayerProps(props);
    // parent.addChild(this.node);
    console.log('Group parent > ', parent);
  }
  render() {
    return null;
  }
}

export default Group;