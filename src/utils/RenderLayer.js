var Frame = require('./Frame');

function RenderLayer () {
  this.children = [];
  this.frame = Frame.zero();
}

RenderLayer.prototype = {

  /**
   * Retrieve the root injection layer
   *
   * @return {RenderLayer}
   */
  getRootLayer: function () {
    var root = this;
    while (root.parentLayer) {
      root = root.parentLayer;
    }
    return root;
  },
  getRootLayer() {
    let root = this;
    while (root.parentLayer) {
      root = root.parentLayer;
    }
    return root;
  },
  addChild(child) {
    child.parentLayer = this;
    this.children.push(child);
  },
  injectBefore(parentLayer, referenceLayer) {
    // FIXME
    this.inject(parentLayer);
  },
  inject(parentLayer) { // 现在 parentLayer = child
    if (this.parentLayer && this.parentLayer !== parentLayer) {
      this.remove();
    }
    if (!this.parentLayer) {
      // parentLayer.addChild(this);
      this.addChild(parentLayer);
    }
  },
  remove() {
    if (this.parentLayer) {
      this.parentLayer.children.splice(this.parentLayer.children.indexOf(this), 1);
    }
  },
  /**
   * Translate a layer's frame
   *
   * @param {Number} x
   * @param {Number} y
   */
  translate: function (x, y) {
    if (this.frame) {
      this.frame.x += x;
      this.frame.y += y;
    }

    if (this.clipRect) {
      this.clipRect.x += x;
      this.clipRect.y += y;
    }

    if (this.children) {
      this.children.forEach(function (child) {
        child.translate(x, y);
      });
    }
  },
  /**
   * Only the root owning layer should implement this function.
   */
  // draw: function () {
  //   // Placeholer
  // }

};

module.exports = RenderLayer;
