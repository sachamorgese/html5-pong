import config from './config';
const { VIRTUAL_HEIGHT, PADDLE_SPEED } = config;

export default class Paddle {
  constructor(x, y, width, height, controls, up, down) {
    this.pos = { x, y };
    this.width = width;
    this.height = height;
    this.controls = controls;
    this.up = up;
    this.down = down;
  }
  
  update(dt) {
    const { height, controls, pos, up, down} = this;
    const move = controls.y(up, down) * PADDLE_SPEED;
    if (move < 0) {
      pos.y = Math.max(0, pos.y + move * dt)
    } else {
      pos.y = Math.min(VIRTUAL_HEIGHT - height, pos.y + move * dt)
    }
  }
  
  render(ctx) {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, this.width, this.height);
  }
}