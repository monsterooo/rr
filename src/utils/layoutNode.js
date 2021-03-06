var computeLayout = require('./Layout');

/**
 * This computes the CSS layout for a RenderLayer tree and mutates the frame
 * objects at each node.
 *
 * @param {Renderlayer} root
 * @return {Object}
 */
function layoutNode (root) {
  var rootNode = createNode(root);
  computeLayout(rootNode);
  walkNode(rootNode);
  return rootNode;
}

function createNode (layer) {
  return {
    layer: layer,
    layout: {
      width: undefined, // computeLayout will mutate
      height: undefined, // computeLayout will mutate
      top: 0,
      left: 0,
    },
    style: layer._originalStyle || {},
    children: (layer.children || []).map(createNode)
  };
}

function walkNode (node, parentLeft, parentTop) {
  node.layer.frame.x = node.layout.left + (parentLeft || 0);
  node.layer.frame.y = node.layout.top + (parentTop || 0);
  node.layer.frame.width = node.layout.width;
  node.layer.frame.height = node.layout.height;
  // set canvas
  if (node.layer.canvas.nodeType !== 'Layer') {
    node.layer.canvas.x(node.layer.frame.x);
    node.layer.canvas.y(node.layer.frame.y);
    node.layer.canvas.size({
      width: node.layer.frame.width,
      height: node.layer.frame.height,
    });
  }
  
  // if (node.layer.canvas) {
  //   node.layer.canvas.x(node.layer.frame.x);
  //   node.layer.canvas.y(node.layer.frame.y);
  //   node.layer.canvas.size({
  //     width: node.layer.frame.width,
  //     height: node.layer.frame.height,
  //   });
  // }
  if (node.children && node.children.length > 0) {
    node.children.forEach(function (child) {
      walkNode(child, node.layer.frame.x, node.layer.frame.y);
    });
  }
}

module.exports = layoutNode;
