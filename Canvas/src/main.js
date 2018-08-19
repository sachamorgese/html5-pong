const canvas = document.querySelector('#board canvas');
const ctx = canvas.getContext('2d');
const { width: w, height: h } = canvas;

// STARFIELD
// ctx.fillStyle = 'black';
// ctx.fillRect(0, 0, w, h);
// ctx.fillStyle = '#555';

// let x, y, radius;
//
// for (let i = 0; i < 550; i++) {
//   x = Math.random() * w;
//   y = Math.random() * h;
//   radius = Math.random() * 3
//
//   ctx.beginPath()
//   ctx.arc(x, y, radius, 0, Math.PI * 2, false);
//   ctx.fill();
// }

// TEXT
// ctx.font = "20pt courier";
//
// const center = w / 2;
// ctx.textAlign = "center";
// for (let i = 0; i < 11; i++) {
//   ctx.fillText("if you're in the game", center, i * 40);
// }
// ctx.strokeText("strokes the word", center, h - 30);

// Image
// const img = new Image();
// img.src = "res/images/rick.png";
// img.addEventListener("load", draw, false);
//
// function draw() {
//   for (let i = 0; i < 100; i++) {
//     const x = Math.random() * w - 50;
//     const y = Math.random() * h - 100;
//     ctx.drawImage(img, x, y);
//   }
// }

// Snowfield
// const img = new Image();
// img.src = "res/images/snowFlake.png";
// img.addEventListener("load", draw, false);
//
// function draw() {
//   for (let i = 0; i < 100; i++) {
//     let x = Math.random() * w;
//     let y = Math.random() * h;
//     let scale = Math.random();
//
//     ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
//   }
// }

// Save/Restore
// function draw() {
//   for (let i=0; i<100; i++) {
//     const x = Math.random() * w;
//     const y = Math.random() * h;
//     ctx.fillRect(x, y, 50, 50);
//   }
// }
//
// ctx.fillStyle = 'black';
// draw();
//
// ctx.save();
// ctx.fillStyle = "red";
// draw();
// ctx.restore();
//
// draw();

// Kaleidoscope
// ctx.translate(w / 2, h / 2);
//
// for (let ring = 1; ring < 28; ring++) {
//   ctx.fillStyle = `hsl(${ring * 25}, 90%, 50%)`;
//   for (let dots = 0; dots < ring * 6; dots++) {
//     ctx.rotate((Math.PI * 2) / (ring * 6));
//     ctx.beginPath();
//     ctx.arc(0, ring * 15, 7, 0, Math.PI * 2, true);
//     ctx.fill();
//   }
// }

// Alpha Transparency
// ctx.globalAlpha = 0.3; // 0 invisible 1 solid

// Draw logo
ctx.globalCompositeOperation;
const centerW = w / 2;
const centerH = h / 2;
ctx.font = 'bold 70pt Courier New';
ctx.textAlign = 'center';
ctx.fillStyle = 'white';
ctx.fillText('Racist', centerW, centerH - 35);
ctx.fillText('Raptor', centerW, centerH + 35);

ctx.globalCompositeOperation = 'source-atop';

for (let i = 0; i < 25; i++) {
  ctx.fillStyle = `hsl(${i * (250 / 25)}, 90%, 55%)`;
  ctx.fillRect(centerW - 170, centerH - 95 + i * 5.35, 340, 20);
}

ctx.fillStyle = '#999';
ctx.globalCompositeOperation = 'destination-over';
ctx.fillText('Racist', centerW + 3, centerH - 33);
ctx.fillText('Raptor', centerW + 3, centerH + 37);

ctx.font = '30pt Courier New';
ctx.globalCompositeOperation = 'source-over';

'games'.split('').forEach((ch, i) => {
  ctx.fillText(ch, i * 37 + centerW - 80, centerH + 85);
});

ctx.globalCompositeOperation = 'destination-over';
let x, y, radius;

for (let i = 0; i < 550; i++) {
  x = Math.random() * w;
  y = Math.random() * h;
  radius = Math.random() * 3;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fill();
}
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, w, h);
ctx.fillStyle = '#555';
