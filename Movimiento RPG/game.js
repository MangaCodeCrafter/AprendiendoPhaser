import { Example } from "./Example.js";

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 960,
    scene: [Example]
};

var game = new Phaser.Game(config);