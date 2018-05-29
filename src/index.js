const React = require('react');
const ReactConsole = require('./components/ReactConsole');
const colors = require('colors/safe');

ReactConsole.render(
  <React.Fragment>
    <info>Hello</info>
    {/* <yellow>World</yellow>
    <cyan>React</cyan>
    <rainbow>Custom Renderer!</rainbow> */}
  </React.Fragment>,
  () => console.log(colors.inverse('##### Update ######'))
);

// ReactConsole.render(
//   <>
//     <green>Hello</green>
//     <yellow>World2</yellow>
//     <cyan>React</cyan>
//   </>
// );


// import React from 'react';
// import ReactDOM from 'react-dom';
// import Custome from './components/Custome';
// import ReactConsole from './components/ReactConsole';

// ReactDOM.render(<Custome />, document.getElementById('root'));

// export default Custome;
