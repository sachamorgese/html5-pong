import config from './config';
import math from '../utils/math';

const { VIRTUAL_HEIGHT, VIRTUAL_WIDTH } = config;

export default class Ball {
  constructor(x, y, width, height) {
    this.pos = { x, y };
    this.width = width;
    this.height = height;
    this.dy = 0;
    this.dx = 0;
  }

  collides(paddle) {
    return !((this.pos.x > paddle.pos.x + paddle.width) ||
      (paddle.pos.x > this.pos.x + this.width)) &&
      !((this.pos.y > paddle.pos.y + paddle.height) ||
        (paddle.pos.y > this.pos.y + this.height))
  }
  
  reset() {
    this.pos.x = VIRTUAL_WIDTH / 2 - this.width / 2;
    this.pos.y = VIRTUAL_HEIGHT / 2 - this.height / 2;
    this.dy = 0;
    this.dx = 0;
  }
  
  update(dt) {
    this.pos.x = this.pos.x + this.dx * dt;
    this.pos.y = this.pos.y + this.dy * dt;
  }
  
  render(ctx) {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, this.width, this.height);
  }
}