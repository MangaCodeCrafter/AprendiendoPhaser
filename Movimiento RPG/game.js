import { Example } from "./src/Scenes/Example.js";

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 960,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y : 0 },
            debug: false
        }
    },
    scene: [Example]
};

var game = new Phaser.Game(config);