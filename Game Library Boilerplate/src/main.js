import { CanvasRenderer, Container, Texture } from '../raptor';

const w = 640;
const h = 480;
const renderer = new CanvasRenderer(w, h);
document.querySelector('#board').appendChild(renderer.view);

const scene = new Container();

let dt = 0;
let last = 0;

function loopy(ms) {
  requestAnimationFrame(loopy);

  const t = ms / 1000;
  dt = t - last;
  last = t;

  scene.update(dt, t);
  renderer.render(scene);
}

requestAnimationFrame(loopy);
