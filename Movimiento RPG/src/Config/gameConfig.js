import { StartMenu } from "../Scenes/StartMenu.js";
import { TutorialMenu } from "../Scenes/TutorialMenu.js";
import { Example } from "../Scenes/Example.js";

export const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 960,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y : 0 },
            debug: true
        }
    },
    scene: [StartMenu, TutorialMenu, Example]
}