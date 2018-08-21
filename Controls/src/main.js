import KeyControls from '../lib/keyControls';
import MouseControls from '../lib/mouseControls';

const canvas = document.querySelector('#board canvas');
const ctx = canvas.getContext('2d');
const { width: w, height: h } = canvas;

// // Game setup code keyboard

// const controls = new KeyControls();
// let x = w / 2;
// let y = h / 2;
// let color = 0;
//
// function loopy(ms) {
//   requestAnimationFrame(loopy);
//
//   x += controls.x;
//   y += controls.y;
//   if (!controls.action) {
//     color += 10;
//     if (color > 360) {
//       color -= 360;
//     }
//   }
//
//   // Draw the rectangle
//   ctx.fillStyle = `hsl(${color}, 50%, 50%)`;
//   ctx.fillRect(x, y, 50, 50);
// }
//
// requestAnimationFrame(loopy);

// Game setup code mouse

const mouse = new MouseControls(canvas);
let color = 0;

function loopy(ms) {
  requestAnimationFrame(loopy);

  const x = mouse.pos.x;
  const y = mouse.pos.y;
  if (mouse.isDown) {
    color += 10;
    if (color > 360) {
      color -= 360;
    }
  }

  // Draw the rectangle
  ctx.fillStyle = `hsl(${color}, 50%, 50%)`;
  ctx.fillRect(x, y, 50, 50);

  mouse.update();
}

requestAnimationFrame(loopy);
