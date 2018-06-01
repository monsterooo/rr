import Konva from 'konva';
import Layer from './Layer';
import * as PIXI from "pixi.js";

class Rect extends Layer {
  constructor(props) {
    super();
    this.props = props;
    this._canvas = new Konva.Rect({
      fill: 'green',
    });
    this.applyLayerProps(props);
    // parent.addChild(this.node);
    console.log('Group parent > ', parent);
  }
  render() {
    return null;
  }
}

export default Rect;