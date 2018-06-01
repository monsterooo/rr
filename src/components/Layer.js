import RenderLayer from '../utils/RenderLayer';
import Frame from '../utils/Frame';

class Layer {
  constructor() {
    this.node = new RenderLayer();
  }
  
  applyLayerProps(props) {
    const layer = this.node;
    const style = (props && props.style) ? props.style : {};
    layer._originalStyle = style;

    // Common layer properties
    layer.alpha = style.alpha;
    layer.backgroundColor = style.backgroundColor;
    layer.borderColor = style.borderColor;
    layer.borderWidth = style.borderWidth;
    layer.borderRadius = style.borderRadius;
    layer.clipRect = style.clipRect;
    layer.frame = Frame.make(style.left || 0, style.top || 0, style.width || 0, style.height || 0);
    layer.scale = style.scale;
    layer.translateX = style.translateX;
    layer.translateY = style.translateY;
    layer.zIndex = style.zIndex;

    // Shadow
    layer.shadowColor = style.shadowColor;
    layer.shadowBlur = style.shadowBlur;
    layer.shadowOffsetX = style.shadowOffsetX;
    layer.shadowOffsetY = style.shadowOffsetY;
  }
}

export default Layer;