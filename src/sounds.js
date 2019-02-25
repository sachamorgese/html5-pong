import raptor from '../raptor'
const { Sound } = raptor;

const paddleHit = new Sound('../res/sounds/paddle_hit.wav');
const score = new Sound('../res/sounds/score.wav');
const wallHit = new Sound('../res/sounds/wall_hit.wav');

export default {
  paddleHit,
  score,
  wallHit,
}