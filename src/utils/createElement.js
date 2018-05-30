import Group from '../components/Group';

function createElement(type, props) {
  const COMPONENTS = {
    Group: () => new Group(props),
    default: undefined,
  };

  return COMPONENTS[type]() || COMPONENTS.default;
}

export {
  createElement,
}
