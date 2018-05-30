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
  draw: function () {
    // Placeholer
  }

};

module.exports = RenderLayer;
