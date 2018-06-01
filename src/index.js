import React from 'react';
import ReactDOM from 'react-dom';
import Surface from './components/Surface';
import { Group, Text, Rect } from './types';

console.log('gruop > ', Group)
const handleDragStart = (e) => {
  console.log('drag start > ', e);
}
const handleTouchStart = (e) => {
  console.log('touch start > ', e);
}

function getGroupStyle(top = 0, left = 0, width = 0, height = 0) {
  return {
    position: 'relative',
    padding: 14,
    top,
    left,
    width,
    height,
    backgroundColor: '#f7f7f7',
  };
}

// window.imageObj = new Image();
// imageObj.src = 'https://konvajs.github.io/assets/yoda.jpg';

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
  getSize() {
    return {
      height: 300,
      width: 300,
    };
    return document.getElementById('root').getBoundingClientRect();
  }
  getPageStyle() {
    var size = this.getSize();
    return {
      position: 'relative',
      padding: 14,
      width: size.width,
      height: size.height,
      backgroundColor: '#f7f7f7',
      flexDirection: 'column'
    };
  }
  getTitleStyle() {
    return {
      // fontFace: FontFace('Georgia'),
      fontSize: 22,
      lineHeight: 28,
      height: 40,
      // width: 100,
      marginBottom: 10,
      color: '#333',
      textAlign: 'center'
    };
  }
  getImageGroupStyle() {
    return {
      position: 'relative',
      flex: 1,
      backgroundColor: '#eee'
    };
  }
  getRect1Style() {
    return {
      position: 'relative',
      flex: 1,
      backgroundColor: '#eee'
    };
  }
  getRect2Style() {
    return {
      position: 'relative',
      flex: 1,
      marginTop: 10,
      backgroundColor: '#eee'
    };
  }
  render() {
    const { groupStyle } = this.state;
    const size = this.getSize();
    return (
      <Surface enableCSSLayout left={0} top={0} width={size.width} height={size.height}>
        <Group style={this.getPageStyle()}>
          <Rect style={this.getRect1Style()} />
          <Rect style={this.getRect2Style()} />
          {/* <Text style={this.getTitleStyle()}>
            test
          </Text>
          <Text style={this.getTitleStyle()}>
            abc
          </Text> */}
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