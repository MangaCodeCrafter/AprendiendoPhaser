import { Game } from './game.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 465,
  scene: [Game]
};

const game = new Phaser.Game(config);