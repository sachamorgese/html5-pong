import config from './config';
import math from '../utils/math';

const { VIRTUAL_HEIGHT, VIRTUAL_WIDTH } = config;

export default class Ball {
  constructor(x, y, width, height) {
    this.pos = { x, y };
    this.width = width;
    this.height = height;
    
    this.dy = math.rand(1, 3) === 2 ? -100 : 100;
    this.dx = math.rand(-50, 51);
  }
  
  reset() {
    this.x = VIRTUAL_WIDTH / 2 - this.width / 2;
    this.y = VIRTUAL_HEIGHT / 2 - this.height / 2;
    this.dy = math.rand(1, 3) === 2 ? -100 : 100;
    this.dx = math.rand(-50, 51);
  }
  
  update(dt) {
    this.x = this.x + this.dx * dt;
    this.y = this.y + this.dy * dt;
  }
  
  render(ctx) {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, this.width, this.height);
  }
}