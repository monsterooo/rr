const Reconciler = require('react-reconciler');
const colors = require('colors/safe');

// const sideEffect = (method, text) => console.log(colors[method](text));
const sideEffect = (method, text) => console.log(text);

// const sideEffect = (method, text) => colog[method](text);

const ConsoleRenderer = Reconciler({
  getRootHostContext() {
    // console.log('getRootHostContext')
    return {getRootHostContext: 'getRootHostContext'};
  },

  getChildHostContext() {
    return {getChildHostContext: 'getChildHostContext'};
  },
  // 获取createInstance返回的实例
  getPublicInstance(instance) {
    return instance;
  },

  createInstance(type, props) {
    return {createInstance: 'createInstance'};
  },

  appendInitialChild(parentInstance, child) {},

  finalizeInitialChildren(host, type, props) {
    if (typeof props.children === 'string') {
      sideEffect(type, props.children);
    }
    return false;
  },

  prepareUpdate(instance, type, oldProps, newProps) {
    return {};
  },

  shouldSetTextContent(type, props) {},
  shouldDeprioritizeSubtree(type, props) {},

  createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {},

  useSyncScheduling: true,

  scheduleDeferredCallback(cb) {},
  cancelDeferredCallback() {},

  prepareForCommit() {},
  resetAfterCommit() {},

  now() { return Date.now() },

  mutation: {
    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      console.log('commitUpdate');
      if (typeof newProps.children === 'string') {
        if (newProps.children !== oldProps.children) {
          sideEffect(type, newProps.children);
        }
      }
    },
    commitMount(instance, type, newProps) {},
    commitTextUpdate(textInstance, oldText, newText) {},
    resetTextContent(instance) {},
    appendChild(parentInstance, child) {},
    appendChildToContainer(parentInstance, child) {},
    insertBefore(parentInstance, child, beforeChild) {},
    insertInContainerBefore(container, child, beforeChild) {},
    removeChild(parentInstance, child) {},
    removeChildFromContainer(container, child) {},
  },
});

// console.log('ConsoleRenderer > ', ConsoleRenderer);

let root;
const ReactConsole = {
  render(element, callback) {
    if (!root) {
      const container = {};
      root = ConsoleRenderer.createContainer(container);
    }
    // console.log('root > ', root);
    const res = ConsoleRenderer.updateContainer(element, root, null, callback);
    // console.log('updateContainer > ', res);
  },
};

module.exports = ReactConsole;
