import raptor from '../raptor';
import config from './config';

const { VIRTUAL_WIDTH, VIRTUAL_HEIGHT } = config;

const { Text } = raptor;

const font = (fontSize) => `${fontSize}px RetroFont`;

const common = (fontSize) => ({
  font: font(fontSize),
  fill: '#fff',
  align: 'center',
});

const smallFont = common(8);
const largeFont = common(16);
const scoreFont = common(32);

export const welcome = new Text('Welcome to Pong!', VIRTUAL_WIDTH / 2, 20, smallFont);
export const pressShift = new Text('Press shift!', VIRTUAL_WIDTH / 2, 30, smallFont);
export const playerServe = (serve) => new Text(`Player ${serve}'s serve!`, VIRTUAL_WIDTH / 2, 20, smallFont );
export const player1Serve = playerServe(1);
export const player2Serve = playerServe(2);
export const playerWins = (winner) => new Text(`Player ${winner} wins!`, VIRTUAL_WIDTH / 2, 30, largeFont );
export const player1Wins = playerWins(1);
export const player2Wins = playerWins(2);
export const player1Score = new Text('0', VIRTUAL_WIDTH / 2 - 50, VIRTUAL_HEIGHT / 3, scoreFont);
export const player2Score = new Text('0', VIRTUAL_WIDTH / 2 + 50, VIRTUAL_HEIGHT / 3, scoreFont);

