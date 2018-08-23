import {
  CanvasRenderer,
  Container,
  Texture,
  Sprite,
  KeyControls,
  Text,
} from '../raptor';

// Game setup code
const w = 640;
const h = 300;
const renderer = new CanvasRenderer(w, h);
document.querySelector('#board').appendChild(renderer.view);

const textures = {
  background: new Texture('res/images/bg.png'),
  spaceship: new Texture('res/images/spaceship.png'),
  bullet: new Texture('res/images/bullet.png'),
  baddie: new Texture('res/images/baddie.png'),
};

const scene = new Container();
const bullets = new Container();
const baddies = new Container();

const controls = new KeyControls();

const score = new Text('score:', {
  font: '20px sans-serif',
  fill: '#8b899a',
  align: 'center',
});
score.pos.x = w / 2;
score.pos.y = h - 30;

// Make a spaceship
const ship = new Sprite(textures.spaceship);
ship.pos.x = 120;
ship.pos.y = h / 2 - 16;
ship.update = function(dt) {
  // Update the player position
  const { pos } = this;
  pos.x += controls.x * dt * 200;
  pos.y += controls.y * dt * 200;

  if (pos.x < 0) pos.x = 0;
  if (pos.x > w) pos.x = w;
  if (pos.y < 0) pos.y = 0;
  if (pos.y > h) pos.y = h;
};

function fireBullet(x, y) {
  const bullet = new Sprite(textures.bullet);
  bullet.pos.x = x;
  bullet.pos.y = y;
  bullet.update = function(dt) {
    this.pos.x += 400 * dt;
  };
  bullets.add(bullet);
}

function spawnBaddie(x, y, speed) {
  const baddie = new Sprite(textures.baddie);
  baddie.pos.x = x;
  baddie.pos.y = y;
  baddie.update = function(dt) {
    this.pos.x += speed * dt;
  };
  baddies.add(baddie);
}

function doGameOver() {
  const gameOverMessage = new Text('Game Over', {
    font: '30pt sans-serif',
    fill: '#8b8994',
    align: 'center',
  });

  gameOverMessage.pos.x = w / 2;
  gameOverMessage.pos.y = 120;

  scene.add(gameOverMessage);
  scene.remove(ship);
  gameOver = true;
}

// Add everything to the scene container
scene.add(new Sprite(textures.background));
scene.add(ship);
scene.add(bullets);
scene.add(baddies);
scene.add(score);

// Game state variables
let lastShot = 0;
let lastSpawn = 0;
let spawnSpeed = 1.0;
let scoreAmount = 0;
let gameOver = false;

// Main loop
let dt = 0;
let last = 0;

function loopy(ms) {
  requestAnimationFrame(loopy);

  const t = ms / 1000;
  dt = t - last;
  last = t;

  // Fire bullets
  if (!gameOver && controls.action && t - lastShot > 0.15) {
    lastShot = t;
    fireBullet(ship.pos.x + 24, ship.pos.y + 10);
  }

  baddies.children.forEach(baddie => {
    if (baddie.pos.x < 32) {
      if (!gameOver) {
        doGameOver();
      }
    }
    bullets.children.forEach(bullet => {
      const dx = baddie.pos.x + 16 - (bullet.pos.x + 8);
      const dy = baddie.pos.y + 16 - (bullet.pos.y + 8);
      if (Math.sqrt(dx * dx + dy * dy) < 24) {
        // Thank you Pytaghoras
        // A hit!
        baddie.dead = true;
        bullet.dead = true;
        scoreAmount += Math.floor(t);
      }
    });
  });

  // Spawn bad guys
  if (t - lastSpawn > spawnSpeed) {
    lastSpawn = t;
    const speed = -50 - Math.random() * Math.random() * 100;
    const position = Math.random() * (h - 24);
    spawnBaddie(w, position, speed);

    // Accelerating for the next spawn
    spawnSpeed = spawnSpeed < 0.05 ? 0.6 : spawnSpeed * 0.97 + 0.001;
  }

  score.text = `score: ${scoreAmount}`;

  scene.update(dt, t);
  renderer.render(scene);
}
requestAnimationFrame(loopy);
