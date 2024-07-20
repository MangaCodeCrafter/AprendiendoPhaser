export class Example extends Phaser.Scene {
    constructor() {
        super({ key: 'example' });
    }

    preload() {
        this.load.image('plains', 'sprites/map/plains.png');
        this.load.tilemapTiledJSON('map', 'sprites/map/map.json');
    }

    create() {
        const map = this.make.tilemap({ key: 'map' });

        const tiles = map.addTilesetImage('Plains', 'plains');

        const groundLayer = map.createLayer('Fondo', tiles, 0, 0);
        const obtaculosLayer = map.createLayer('Obstaculos', tiles)

    }
}