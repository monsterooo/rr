var Reconciler = require('react-reconciler');

var ReconcilerConfig = {
  // You'll need to implement some methods here.
  // See below for more information and examples.
};

var MyRenderer = Reconciler(ReconcilerConfig);

var RendererPublicAPI = {
  render(element, container, callback) {
    // Call MyRenderer.updateContainer() to schedule changes on the roots.
    // See ReactDOM, React Native, or React ART for practical examples.
  }
};

module.exports = RendererPublicAPI;