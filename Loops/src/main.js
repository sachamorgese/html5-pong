const canvas = document.querySelector('#board canvas');
const ctx = canvas.getContext('2d');
const { width: w, height: h } = canvas;

// // Game setup code
// ctx.fillStyle = '#000';
// ctx.globalAlpha = 0.05;

// function loopy(ms) {
//   requestAnimationFrame(loopy);
//
//   // Game logic code
//   ctx.save();
//   ctx.fillRect(0, 0, w, h);
//   ctx.fillStyle = '#fff';
//   ctx.globalAlpha = 1;
//
//   // Random Circle
//   const x = Math.random() * w;
//   const y = Math.random() * h;
//   const radius = Math.random() * 20;
//
//   ctx.beginPath();
//   ctx.arc(x, y, radius, 0, Math.PI * 2);
//   ctx.fill();
//
//   ctx.restore();
// }

// Game setup code
let dt = 0;
let last = 0;
const speed = 64;
let p1 = 0;
let p2 = 0;

function loopy(ms) {
  requestAnimationFrame(loopy);

  const t = ms / 1000; // Working in seconds (optional)

  dt = t - last;
  last = t;

  // Game logic code
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = '#999';
  ctx.strokeText(`Frame length: ${(dt * 1000).toFixed(2)} ms`, 70, 50);
  ctx.strokeText(`Total time: ${t.toFixed(2)}`, 70, 90);

  p1 += speed * dt;
  p2 += speed * (1 / 60);
  if (p1 > w) p1 -= w + 50;
  if (p2 > w) p2 -= w + 50;
  ctx.fillStyle = '#f00';
  ctx.fillRect(p1, 120, 50, 50);
  ctx.fillRect(p2, 190, 50, 50);
}

requestAnimationFrame(loopy);
