import raptor from '../raptor/';
import config from './config';
import Paddle from './Paddle';
import Ball from './Ball';
import math from '../utils/math';

const { VIRTUAL_WIDTH, VIRTUAL_HEIGHT } = config;
const { Game, Text, KeyControls } = raptor;

const game = new Game(VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
const controls = new KeyControls();

const { scene } = game;

const player1 = new Paddle(10, 30, 5, 20, controls, 87, 83);
const player2 = new Paddle(VIRTUAL_WIDTH - 15, VIRTUAL_HEIGHT - 30, 5, 20, controls, 38, 40);
const ball = new Ball(VIRTUAL_WIDTH / 2 - 2, VIRTUAL_HEIGHT / 2 - 2, 4, 4);

scene.add(player1);
scene.add(player2);
scene.add(ball);

let player1Score = 0;
let player2Score = 0;
let servingPlayer = 1;
let winningPlayer = null;

let gameState = 'start';

game.run(dt => {
  if (controls.enter) {
    if (gameState === 'start') {
      gameState = 'serve';
    } else if (gameState === 'serve') {
      gameState = 'play';
    } else if (gameState === 'done') {
      gameState = 'serve';

      ball.reset();

      player1Score = 0;
      player2Score = 0;

      if (winningPlayer === 1) {
        servingPlayer = 2;
      } else {
        servingPlayer = 1;
      }
    }
    console.log(gameState);
  }

  if (gameState === 'serve') {
    ball.dy = math.rand(-50, 51);
    if (servingPlayer === 1) {
      ball.dx = math.rand(140, 201);
    } else {
      ball.dx = -math.rand(140, 201);
    }
    console.log(ball)
  } else if (gameState === 'play') {
      if (ball.collides(player1)) {
        ball.dx = -ball.dx * 1.03;
        ball.pos.x = player1.pos.x + 5;

        if (ball.dy < 0) {
          ball.dy = math.rand(-150, -11);
        } else {
          ball.dy = math.rand(10, 151);
        }
        // todo: Play sound (paddle_hit)
      } else if (ball.collides(player2)) {
        ball.dx = -ball.dx * 1.03;
        ball.pos.x = player2.pos.x - 4;

        if (ball.dy < 0) {
          ball.dy = math.rand(10, 151);
        } else {
          ball.dy = math.rand(-150, -11);
        }
        // todo: Play sound (paddle_hit)
      }

      if (ball.pos.y <= 0) {
        ball.pos.y = 0;
        ball.dy = -ball.dy;
        // todo: Play sound (wall_hit)

      } else if (ball.pos.y >= VIRTUAL_HEIGHT) {
        ball.pos.y = VIRTUAL_HEIGHT -4;
        ball.dy = -ball.dy;
        // todo: Play sound (wall_hit)
      }

      if (ball.pos.x < 0) {
        servingPlayer = 1;
        player2Score += 1;
        // todo: Play sound (score)

        if (player2Score === 10) {
          winningPlayer = 2;
          gameState = 'done';
        } else {
          gameState = 'serve';
          ball.reset();
        }
      } else if (ball.pos.x > VIRTUAL_WIDTH) {
        servingPlayer = 2;
        player1Score += 1;
        // todo: Play sound (score)

          if (player1Score === 10) {
            winningPlayer = 1;
            gameState = 'done';
          } else {
            gameState = 'serve';
            ball.reset();
          }
      }
}

});
