import React from 'react';
import ReactDOM from 'react-dom';
import Surface from './components/Surface';
import { Group, Text } from './types';

console.log('gruop > ', Group)
const handleDragStart = (e) => {
  console.log('drag start > ', e);
}
const handleTouchStart = (e) => {
  console.log('touch start > ', e);
}

function getGroupStyle(width, height) {
  return {
    position: 'relative',
    padding: 14,
    width: width,
    height: height,
    backgroundColor: '#f7f7f7',
    flexDirection: 'column'
  };
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupStyle: getGroupStyle(50, 100),
    };
    // setTimeout(() => {
    //   this.setState({
    //     groupStyle: getGroupStyle(100, 200),
    //   })
    // }, 3000)
  }
  render() {
    const { groupStyle } = this.state;

    return (
      <Surface enableCSSLayout onTouchStart={handleTouchStart} width={300} height={300}>
        <Group style={groupStyle}>
          <Text>
            Test
          </Text>
        </Group>
      </Surface>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export { Surface };