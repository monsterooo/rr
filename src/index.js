import React from 'react';
import ReactDOM from 'react-dom';
import Surface from './components/Surface';
import { Group } from './types';

console.log('gruop > ', Group)
const handleDragStart = (e) => {
  console.log('drag start > ', e);
}
const handleTouchStart = (e) => {
  console.log('touch start > ', e);
}

ReactDOM.render(
  <Surface onTouchStart={handleTouchStart} width={300} height={300}>
    <Group style={{color: 'red'}}>

    </Group>
  </Surface>, 
  document.getElementById('root')
);

export { Surface };