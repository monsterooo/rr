import emptyObject from 'fbjs/lib/emptyObject';
import invariant from "fbjs/lib/invariant";
import ReactReconciler from 'react-reconciler';
import now from "performance-now";
import { createElement } from '../utils/createElement';

function appendChild(parentInstance, child) {
  debugger;
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
  invariant(false, "不支持文本实例，请使用Text组件.");
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
  // return diffProps(pixiElement, type, oldProps, newProps, rootContainerInstance);
  console.log('prepareUpdate')
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

// 提交更新
function commitUpdate(instance, updatePayload, type, lastRawProps, nextRawProps, internalInstanceHandle) {
  // // injected types need to have full control over passed props
  // if (isInjectedType(type)) {
  //   applyProps(instance, lastRawProps, nextRawProps);
  //   return;
  // }

  // // updatePayload is in the form of [propKey1, propValue1, ...]
  // const updatedPropKeys = including(updatePayload.filter((item, i) => i % 2 === 0));
  // const oldProps = filterByKey(lastRawProps, updatedPropKeys);
  // const newProps = filterByKey(nextRawProps, updatedPropKeys);

  // // regular components only receive props that have changed
  // applyProps(instance, oldProps, newProps);
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
  isPrimaryRenderer: false,
  supportsMutation: true,
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

export default Reconciler;