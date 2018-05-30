import RenderLayer from '../utils/RenderLayer';
import Frame from '../utils/Frame';

class Layer {
  constructor() {
    this.node = new RenderLayer();
    this.children = [];
  }
  getRootLayer() {
    let root = this;
    while (root.parentLayer) {
      root = root.parentLayer;
    }
    return root;
  }
  addChild(child) {
    child.parentLayer = this;
    this.children.push(child);
  }
  injectBefore(parentLayer, referenceLayer) {
    // FIXME
    this.inject(parentLayer);
  }
  inject(parentLayer) { // 现在 parentLayer = child
    if (this.parentLayer && this.parentLayer !== parentLayer) {
      this.remove();
    }
    if (!this.parentLayer) {
      // parentLayer.addChild(this);
      this.addChild(parentLayer);
    }
  }
  remove() {
    if (this.parentLayer) {
      this.parentLayer.children.splice(this.parentLayer.children.indexOf(this), 1);
    }
  }
  applyLayerProps(props) {
    const layer = this.node;
    const style = (props && props.style) ? props.style : {};
    layer.frame = Frame.make(style.left || 0, style.top || 0, style.width || 0, style.height || 0);

    layer._originalStyle = style;
    layer.x = layer.frame.x;
    layer.y = layer.frame.y;
    layer.width = layer.frame.width;
    layer.height = layer.frame.height;
    // layer.scale = style.scale;
    layer.alpha = style.alpha;

    // layer.translateX = style.translateX;
    // layer.translateY = style.translateY;
    // layer.zIndex = style.zIndex;
  }
}

export default Layer;