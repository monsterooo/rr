import Konva from 'konva';
import Layer from './Layer';
import * as PIXI from "pixi.js";

class Text extends Layer {
  constructor(props) {
    super();
    const { children } = props;

    this.props = props;
    this._canvas = new Konva.Text({
      fill: 'red',
      fontSize: 24,
      text: 'test',
    });
    this.applyLayerProps(props);
    // parent.add(this.node);
    console.log('Text parent > ', parent);
  }
  render() {
    return null;
  }
}

export default Text;