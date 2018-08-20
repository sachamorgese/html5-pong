import KeyControls from '../lib/keyControls';

const canvas = document.querySelector('#board canvas');
const ctx = canvas.getContext('2d');
const { width: w, height: h } = canvas;
const controls = new KeyControls();

// Game setup code
let x = w / 2;
let y = h / 2;
let color = 0;

function loopy(ms) {
  requestAnimationFrame(loopy);

  x += controls.x;
  y += controls.y;
  if (!controls.action) {
    color += 10;
    if (color > 360) {
      color -= 360;
    }
  }

  // Draw the rectangle
  ctx.fillStyle = `hsl(${color}, 50%, 50%)`;
  ctx.fillRect(x, y, 50, 50);
}

requestAnimationFrame(loopy);
