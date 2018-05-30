import Group from '../components/Group';
import Text from '../components/Text';

function createElement(type, props, internalInstanceHandle) {
  const COMPONENTS = {
    Group: () => new Group(props, internalInstanceHandle),
    Text: () => new Text(props, internalInstanceHandle),
    default: undefined,
  };

  return COMPONENTS[type]() || COMPONENTS.default;
}

export {
  createElement,
}
