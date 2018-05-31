import Konva from 'konva';
import Layer from './Layer';
import * as PIXI from "pixi.js";
import yoda from '../sources/yoda.jpg';

const img = new window.Image();
img.src = yoda;

class Image extends Layer {
  constructor(props) {
    super();
    this.props = props;
    this._canvas = new Konva.Image({});
    img.onload = () => {
      this._canvas.setImage(img);
      this._canvas.draw();
    }
    this.applyLayerProps(props);
    // parent.addChild(this.node);
    console.log('Group parent > ', parent);
  }
  render() {
    return null;
  }
}

export default Image;