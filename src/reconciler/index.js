import emptyObject from 'fbjs/lib/emptyObject';
import invariant from "fbjs/lib/invariant";
import ReactReconciler from 'react-reconciler';
import now from "performance-now";
import { createElement } from '../utils/createElement';

function appendChild(parentInstance, child) {
  debugger;
  if (child) {
    child.node.canvas = child._canvas;
    parentInstance._canvas.add(child._canvas);
    parentInstance.node.inject(child.node);
  }
  // if (child) {
  //   parentInstance.inject(child);
  // }
  // parentInstance.removeChild(child);
  // parentInstance.addChild(child);
  console.log('appendChild > ');
}

function removeChild(parentInstance, child) {
  // if (typeof child._customWillDetach === "function") {
  //   child._customWillDetach(child);
  // }

  // parentInstance.removeChild(child);

  // child.destroy();
  console.log('removeChild > ');
}

function insertBefore(parentInstance, child, beforeChild) {
  // invariant(child !== beforeChild, "cannot insert node before itself");

  // const childExists = parentInstance.children.indexOf(child) !== -1;
  // const index = parentInstance.getChildIndex(beforeChild);

  // if (childExists) {
  //   parentInstance.setChildIndex(child, index);
  // } else {
  //   parentInstance.addChildAt(child, index);
  // }
  // debugger;
  console.log('insertBefore > ');
}

/**
 * 
 * @param {type} type 组件类型
 * @param {props} props 组件props
 * @param {*} internalInstanceHandle  内部实例
 */
function createInstance(type, props, internalInstanceHandle) {
  // console.log('createInstance > ', type, props, internalInstanceHandle);
  return createElement(type, props);
}

function createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
  // debugger;
  // invariant(false, "不支持文本实例，请使用Text组件.");
}

function finalizeInitialChildren(newInstance, type, newProps, rootContainerInstance, currentHostContext) {
  return false;
}

function getPublicInstance(inst) {
  return inst;
}

function prepareForCommit() {
  // Noop
  console.log('prepareForCommit')
}

function prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext) {
  // return diffProps(instance, type, oldProps, newProps, rootContainerInstance);
  // 更新子节点属性
  debugger;
  instance.applyLayerProps(newProps);
  // console.log('prepareUpdate > ');
  // console.log('instance > ', instance);
  // console.log('type > ', type);
  // console.log('oldProps > ', oldProps);
  // console.log('newProps > ', newProps);
  // console.log('rootContainerInstance > ', rootContainerInstance);
  // console.log('currentHostContext > ', currentHostContext);
  return true;
}

function resetAfterCommit() {
  // Noop
  console.log('resetAfterCommit')
}

function resetTextContent(pixiElement) {
  // Noop
  console.log('resetTextContent')
}

function getRootHostContext(rootContainerInstance) {
  return emptyObject;
}

function getChildHostContext(parentHostContext, type) {
  return emptyObject;
}

function shouldSetTextContent(type, props) {
  return false;
}

// 更新props
function commitUpdate(instance, updatePayload, type, lastRawProps, nextRawProps, internalInstanceHandle) {
  instance.applyLayerProps(nextRawProps);
  console.log('commitUpdate > ');
}

function commitMount(instance, type, newProps) {
  // Noop
  console.log('commitMount')
}

function commitTextUpdate(textInstance, oldText, newText) {
  // Noop
  console.log('commitTextUpdate')
}

function shouldDeprioritizeSubtree(type, props) {
  // const isAlphaVisible = typeof props.alpha === "undefined" || props.alpha > 0;
  // const isRenderable = typeof props.renderable === "undefined" || props.renderable === true;
  // const isVisible = typeof props.visible === "undefined" || props.visible === true;

  // return !(isAlphaVisible && isRenderable && isVisible);
  console.log('shouldDeprioritizeSubtree > ');
}
const Reconciler = ReactReconciler({
  appendInitialChild: appendChild,
  createInstance,
  createTextInstance,
  finalizeInitialChildren,
  getPublicInstance,
  prepareForCommit,
  prepareUpdate,
  resetAfterCommit,
  resetTextContent,
  getRootHostContext,
  getChildHostContext,
  shouldSetTextContent,
  shouldDeprioritizeSubtree,
  now,
  // isPrimaryRenderer: false,
  // supportsMutation: true,
  // useSyncScheduling: true,
  mutation: {
    appendChild,
    appendChildToContainer: appendChild,
    removeChild,
    removeChildFromContainer: removeChild,
    insertBefore,
    insertInContainerBefore: insertBefore,
    commitUpdate,
    commitMount,
    commitTextUpdate,
  },
});

const CHILDREN = 'children';
// Calculate the diff between the two objects.
// See: https://github.com/facebook/react/blob/97e2911/packages/react-dom/src/client/ReactDOMFiberComponent.js#L546
export function diffProps(pixiElement, type, lastRawProps, nextRawProps, rootContainerElement) {
  let updatePayload = null;

  let lastProps = lastRawProps;
  let nextProps = nextRawProps;
  let propKey;

  for (propKey in lastProps) {
    if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
      continue;
    }
    if (propKey === CHILDREN) {
      // Noop. Text children not supported
    } else {
      // For all other deleted properties we add it to the queue. We use
      // the whitelist in the commit phase instead.
      (updatePayload = updatePayload || []).push(propKey, null);
    }
  }
  for (propKey in nextProps) {
    const nextProp = nextProps[propKey];
    const lastProp = lastProps != null ? lastProps[propKey] : undefined;
    if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || (nextProp == null && lastProp == null)) {
      continue;
    }
    if (propKey === CHILDREN) {
      // Noop. Text children not supported
    } else {
      // For any other property we always add it to the queue and then we
      // filter it out using the whitelist during the commit.
      (updatePayload = updatePayload || []).push(propKey, nextProp);
    }
  }
  return updatePayload;
}

export default Reconciler;