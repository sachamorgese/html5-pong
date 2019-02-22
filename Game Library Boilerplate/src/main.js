import raptor from '../raptor/';
import config from './config';
import Paddle from './Paddle';
import Ball from './Ball';
import state from './state';

const { VIRTUAL_WIDTH, VIRTUAL_HEIGHT } = config;
const { Game, Text, KeyControls, Sound, math } = raptor;

const game = new Game(VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
const controls = new KeyControls();

const { scene } = game;

const paddleHit = new Sound('../res/sounds/paddle_hit.wav');
const score = new Sound('../res/sounds/score.wav');
const wallHit = new Sound('../res/sounds/wall_hit.wav');

const player1 = new Paddle(10, 30, 5, 20, controls, 87, 83);
const player2 = new Paddle(VIRTUAL_WIDTH - 15, VIRTUAL_HEIGHT - 30, 5, 20, controls, 38, 40);
const ball = new Ball(VIRTUAL_WIDTH / 2 - 2, VIRTUAL_HEIGHT / 2 - 2, 4, 4);

scene.add(player1);
scene.add(player2);
scene.add(ball);

const font = (fontSize) => `${fontSize}px RetroFont`;

const common = (fontSize) => ({
  font: font(fontSize),
  fill: '#fff',
  align: 'center',
});

const smallFont = common(8);
const largeFont = common(16);
const scoreFont = common(32);

const welcome = new Text('Welcome to Pong!', VIRTUAL_WIDTH / 2, 20, smallFont);
const pressEnter = new Text('Press shift!', VIRTUAL_WIDTH / 2, 30, smallFont);
const playerServe = (serve) => new Text(`Player ${serve}'s serve!`, VIRTUAL_WIDTH / 2, 20, smallFont );
const player1Serve = playerServe(1);
const player2Serve = playerServe(2);
const playerWins = (winner) => new Text(`Player ${winner} wins!`, VIRTUAL_WIDTH / 2, 30, largeFont );
const player1Wins = playerWins(1);
const player2Wins = playerWins(2);
const player1Score = new Text('0', VIRTUAL_WIDTH / 2 - 50, VIRTUAL_HEIGHT / 3, scoreFont);
const player2Score = new Text('0', VIRTUAL_WIDTH / 2 + 50, VIRTUAL_HEIGHT / 3, scoreFont);

scene.add(pressEnter);
scene.add(welcome);

scene.add(player1Score);
scene.add(player2Score);

game.run((dt, t) => {
  if (controls.shift && !state.holdingStart) {
    state.holdingStart = true;
    if (state.gameState === 'play') {
      return;
    } else if (state.gameState === 'start') {
      scene.remove(welcome);
      state.gameState = 'serve';
      scene.add(state.servingPlayer === 1 ? player1Serve : player2Serve);
      ball.setBall();
    } else if (state.gameState === 'serve') {
      scene.remove(state.servingPlayer === 1 ? player1Serve : player2Serve);
      scene.remove(pressEnter);
      state.gameState = 'play';
    } else if (state.gameState === 'done') {
      state.gameState = 'serve';

      ball.reset();
      
      scene.remove(state.winningPlayer === 1 ? player1Wins : player2Wins);

      state.player1Score = 0;
      state.player2Score = 0;
      player1Score.text = state.player1Score;
      player2Score.text = state.player2Score;
      scene.add(state.servingPlayer === 1 ? player1Serve : player2Serve);
      scene.add(pressEnter);
  
      if (state.winningPlayer === 1) {
        state.servingPlayer = 2;
      } else {
        state.servingPlayer = 1;
      }
      
      state.winningPlayer = null;
    }
  } else if (!controls.shift) {
    state.holdingStart = false;
  }

  if (state.gameState === 'play') {
      if (ball.collides(player1)) {
        ball.dx = -ball.dx * 1.03;
        ball.pos.x = player1.pos.x + 5;

        if (ball.dy < 0) {
          ball.dy = -math.rand(10, 151);
        } else {
          ball.dy = math.rand(10, 151);
        }

        paddleHit.play();
      } else if (ball.collides(player2)) {
        ball.dx = -ball.dx * 1.03;
        ball.pos.x = player2.pos.x - 4;

        if (ball.dy > 0) {
          ball.dy = math.rand(10, 151);
        } else {
          ball.dy = -math.rand(10, 151);
        }
  
        paddleHit.play();
      }

      if (ball.pos.y <= 0) {
        ball.pos.y = 0;
        ball.dy = -ball.dy;
        wallHit.play();
      } else if (ball.pos.y >= VIRTUAL_HEIGHT - ball.height) {
        ball.pos.y = VIRTUAL_HEIGHT -4;
        ball.dy = -ball.dy;
        wallHit.play();
      }

      if (ball.pos.x < 0) {
        state.servingPlayer = 1;
        state.player2Score += 1;
        score.play();
        
        player2Score.text = state.player2Score;
  
        if (state.player2Score === 5) {
          state.winningPlayer = 2;
          state.gameState = 'done';
          scene.add(player2Wins);
        } else {
          state.gameState = 'serve';
          ball.reset();
          scene.add(player1Serve);
        }
      } else if (ball.pos.x > VIRTUAL_WIDTH) {
        state.servingPlayer = 2;
        state.player1Score += 1;
        score.play();
        
        player1Score.text = state.player1Score;
  
        if (state.player1Score === 5) {
          state.winningPlayer = 1;
            state.gameState = 'done';
            scene.add(player1Wins);
        } else {
            state.gameState = 'serve';
            ball.reset();
            scene.add(player2Serve);
        }
      }
}

});
