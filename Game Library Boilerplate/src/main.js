import { CanvasRenderer, Container, Text } from '../raptor/';

const scene = new Container();
const message = new Text('The Renderer!', {
  font: '40pt monospace',
  fill: 'blue',
  align: 'center',
});

message.pos.x = w / 2;
message.pos.y = h / 2;

scene.add(message);

const w = 640;
const h = 480;
const renderer = new CanvasRenderer(w, h);
document.querySelector('#board').appendChild(renderer.view);

// function loopy(ms) {
//   requestAnimationFrame(loopy);
// }
//
// requestAnimationFrame(loopy);
