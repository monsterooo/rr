import React from "react";
import PropTypes from 'prop-types';
import Reconciler from '../reconciler';
import RenderLayer from '../utils/RenderLayer';
import Konva from 'konva';

class Surface extends React.Component {
  componentDidMount() {
    const { children, width, height } = this.props;

    this._stage = new Konva.Stage({
      width,
      height,
      container: this._tagRef
    });
    // console.log('应用节点属性前 > ', this._stage);
    applyNodeProps(this._stage, this.props);
    // console.log('应用节点属性后 > ', this._stage);

    this.node = new RenderLayer();
    this._mountNode = Reconciler.createContainer(this._stage);
    console.log('_mountNode > ', this._mountNode);
    const res = Reconciler.updateContainer(this.props.children, this._mountNode, this);
    console.log('res > ', res);

    Reconciler.injectIntoDevTools({
      findFiberByHostInstance: Reconciler.findFiberByHostInstance,
      bundleType: 1,
      version: '0.1.0',
      rendererPackageName: 'rr-Surface',
    });
    // console.log('mount node > ', this._mountNode);
    // console.log('did mount')
  }
  componentDidUpdate(prevProps, prevState) {
    const props = this.props;

    applyNodeProps(this._stage, this.props, prevProps);
    Reconciler.updateContainer(this.props.children, this._mountNode, this);
  }
  componentWillUnmount() {
    Reconciler.updateContainer(null, this._mountNode, this);
    this._stage.destroy();
  }
  getStage() {
    return this._stage;
  }
  scale() {
    // const { scale } = this.props;

    // this.getContext().scale(scale);
  }
  render() {
    const props = this.props;

    return (
      <div
        ref={ref => (this._tagRef = ref)}
        accessKey={props.accessKey}
        className={props.className}
        role={props.role}
        style={props.style}
        tabIndex={props.tabIndex}
        title={props.title}
      />
    );
  }
}

const propsToSkip = { children: true, ref: true, key: true, style: true };
const EVENTS_NAMESPACE = '.react-konva-event';

let idWarningShowed = false;
let zIndexWarningShowed = false;

function applyNodeProps(instance, props, oldProps = {}) {
  if (!idWarningShowed && 'id' in props) {
    const message = `ReactKonva: You are using "id" attribute for a Konva node. In some very rare cases it may produce bugs. Currently we recommend not to use it and use "name" attribute instead.
You are using id = "${props.id}".
For me info see: https://github.com/lavrton/react-konva/issues/119`;
    console.warn(message);
    idWarningShowed = true;
  }

  if (!zIndexWarningShowed && 'zIndex' in props) {
    const message = `ReactKonva: You are using "zIndex" attribute for a Konva node.
react-konva may get confused with ordering. Just define correct order of elements in your render function of a component.
For me info see: https://github.com/lavrton/react-konva/issues/194
`;
    console.warn(message);
    zIndexWarningShowed = true;
  }

  var updatedProps = {};
  var hasUpdates = false;
  for (var key in oldProps) {
    if (propsToSkip[key]) {
      continue;
    }
    var isEvent = key.slice(0, 2) === 'on';
    var propChanged = oldProps[key] !== props[key];
    if (isEvent && propChanged) {
      var eventName = key.substr(2).toLowerCase();
      if (eventName.substr(0, 7) === 'content') {
        eventName =
          'content' +
          eventName.substr(7, 1).toUpperCase() +
          eventName.substr(8);
      }
      instance.off(eventName, oldProps[key]);
    }
    var toRemove = !props.hasOwnProperty(key);
    if (toRemove) {
      instance.setAttr(key, undefined);
    }
  }
  for (var key in props) {
    if (propsToSkip[key]) {
      continue;
    }
    var isEvent = key.slice(0, 2) === 'on';
    var toAdd = oldProps[key] !== props[key];
    if (isEvent && toAdd) {
      var eventName = key.substr(2).toLowerCase();
      if (eventName.substr(0, 7) === 'content') {
        eventName =
          'content' +
          eventName.substr(7, 1).toUpperCase() +
          eventName.substr(8);
      }
      if (props[key]) {
        instance.on(eventName + EVENTS_NAMESPACE, props[key]);
      }
    }
    if (
      !isEvent &&
      (props[key] !== oldProps[key] || props[key] !== instance.getAttr(key))
    ) {
      hasUpdates = true;
      updatedProps[key] = props[key];
    }
  }

  if (hasUpdates) {
    instance.setAttrs(updatedProps);
    updatePicture(instance);
  }
}

function updatePicture(node) {
  var drawingNode = node.getLayer() || node.getStage();
  drawingNode && drawingNode.batchDraw();
}


export default Surface;