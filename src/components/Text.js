import Konva from 'konva';
import Layer from './Layer';
import * as PIXI from "pixi.js";

class Text extends Layer {
  constructor(props, parent) {
    super();
    const { children } = props;

    this.props = props;
    this.node = new PIXI.Text(children, {
      fill: 'red',
      fontSize: 24,
    });
    // this.applyLayerProps(props);
    parent.addChild(this.node);
    console.log('Text parent > ', parent);
  }
  render() {
    return null;
  }
}

export default Text;