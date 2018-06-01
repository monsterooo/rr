import Group from '../components/Group';
import Text from '../components/Text';
import Image from '../components/Image';
import Rect from '../components/Rect';

function createElement(type, props) {
  const COMPONENTS = {
    Group: (props) => new Group(props),
    Text: (props) => new Text(props),
    Image: (props) => new Image(props),
    Rect: (props) => new Rect(props),
    default: undefined,
  };

  return COMPONENTS[type](props) || COMPONENTS.default;
}

export {
  createElement,
}
