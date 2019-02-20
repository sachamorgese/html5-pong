import raptor from '../raptor/';
import config from './config';
import Paddle from './Paddle';
import Ball from './Ball';
import state from './state';
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

const font = (fontSize) => `${fontSize} RetroFont`;

const common = (fontSize) => ({
  font: font(fontSize),
  fill: '#fff',
  align: 'center',
});

const smallFont = common(8);
const largeFont = common(16);
const scoreFont = common(32);

const welcome = new Text('Welcome to Pong!', VIRTUAL_WIDTH / 2, 10, smallFont);
const pressEnter = new Text('Press Enter to begin!', VIRTUAL_WIDTH / 2, 20, smallFont);
const playerServe = (serve) => new Text(`Player ${serve}'s serve!`, VIRTUAL_WIDTH / 2, 10, smallFont );
const player1Serve = playerServe(1);
const player2Serve = playerServe(2);
const toServe = new Text('Press Enter to serve!', VIRTUAL_WIDTH / 2, 20, smallFont);

scene.add(welcome);
scene.add(pressEnter);

game.run((dt, t) => {
  if (controls.enter && !state.holdingStart) {
    state.holdingStart = true;
    if (state.gameState === 'play') {
      return;
    } else if (state.gameState === 'start') {
      scene.remove(welcome);
      scene.remove(pressEnter);
      state.gameState = 'serve';
      scene.add(state.servingPlayer === 1 ? player1Serve : player2Serve);
      scene.add(toServe);
    } else if (state.gameState === 'serve') {
      scene.remove(state.servingPlayer === 1 ? player1Serve : player2Serve);
      scene.remove(toServe);
      state.gameState = 'play';
    } else if (state.gameState === 'done') {
      state.gameState = 'serve';

      ball.reset();

      state.player1Score = 0;
      state.player2Score = 0;

      if (state.winningPlayer === 1) {
        state.servingPlayer = 2;
      } else {
        state.servingPlayer = 1;
      }
      
      state.winningPlayer = null;
    }
  } else if (!controls.enter) {
    state.holdingStart = false;
  }

  if (state.gameState === 'serve') {
    ball.dy = math.rand(-50, 51);
    if (state.servingPlayer === 1) {
      ball.dx = math.rand(140, 201);
    } else {
      ball.dx = -math.rand(140, 201);
    }
  } else if (state.gameState === 'play') {
      if (ball.collides(player1)) {
        ball.dx = -ball.dx * 1.03;
        ball.pos.x = player1.pos.x + 5;

        if (ball.dy < 0) {
          ball.dy = -math.rand(10, 151);
        } else {
          ball.dy = math.rand(10, 151);
        }

        // todo: Play sound (paddle_hit)
      } else if (ball.collides(player2)) {
        ball.dx = -ball.dx * 1.03;
        ball.pos.x = player2.pos.x - 4;

        if (ball.dy > 0) {
          ball.dy = math.rand(10, 151);
        } else {
          ball.dy = -math.rand(10, 151);
        }
        // todo: Play sound (paddle_hit)
      }

      if (ball.pos.y <= 0) {
        ball.pos.y = 0;
        ball.dy = -ball.dy;
        // todo: Play sound (wall_hit)

      } else if (ball.pos.y >= VIRTUAL_HEIGHT - ball.height) {
        ball.pos.y = VIRTUAL_HEIGHT -4;
        ball.dy = -ball.dy;
        // todo: Play sound (wall_hit)
      }

      if (ball.pos.x < 0) {
        state.servingPlayer = 1;
        state.player2Score += 1;
        // todo: Play sound (score)

        if (state.player2Score === 10) {
          state.winningPlayer = 2;
          state.gameState = 'done';
        } else {
          state.gameState = 'serve';
          ball.reset();
        }
      } else if (ball.pos.x > VIRTUAL_WIDTH) {
        state.servingPlayer = 2;
        state.player1Score += 1;
        // todo: Play sound (score)
  
        if (state.player1Score === 10) {
            state.winningPlayer = 1;
            state.gameState = 'done';
          } else {
            state.gameState = 'serve';
            ball.reset();
          }
      }
}

});
