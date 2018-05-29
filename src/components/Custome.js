import React from 'react';

class Custome extends React.Component {
  constructor(props, context) {
    super(props);
    this.rootNode = null;
  }
  componentWillUnmount() {
    console.log('custome will mount');
  }
  componentDidMount() {
    console.log('custome did mount');
  }
  componentWillUnmount() {
    console.log('custome will unmount');
  }
  render() {
    console.log('custome render', this.props);
    return null;
  }
}

export default Custome;