import raptor from '../raptor/';
import config from './config';
import Paddle from './Paddle';
import Ball from './Ball';

const { VIRTUAL_WIDTH, VIRTUAL_HEIGHT } = config;
const { Game, Text, KeyControls } = raptor;

const game = new Game(VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
const controls = new KeyControls();

const { scene, w, h } = game;

const player1 = new Paddle(10, 30, 5, 20, controls, 87, 83);
const player2 = new Paddle(VIRTUAL_WIDTH - 15, VIRTUAL_HEIGHT - 30, 5, 20, controls, 38, 40);
const ball = new Ball(VIRTUAL_WIDTH / 2 - 2, VIRTUAL_HEIGHT / 2 - 2, 4, 4);

scene.add(player1);
scene.add(player2);
scene.add(ball);

const player1Score = 0;
const player2Score = 0;
let servingPlayer = 1;
let winningPlayer = null;

let gameState = 'start';

game.run(dt => {



});
