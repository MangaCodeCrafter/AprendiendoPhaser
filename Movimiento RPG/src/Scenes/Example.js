import Player from "../Objetcs/player.js";

export class Example extends Phaser.Scene {
    constructor() {
        super({ key: 'example' });
    }


    preload() {
        this.load.image('plains', 'sprites/map/plains.png')
        this.load.tilemapTiledJSON('map', 'sprites/map/map.json')

        this.load.spritesheet('player', 'sprites/characters/player.png',
            { frameWidth: 48, frameHeight: 48 }
        )
    }

    create() {
        // DIBUJAR MAPA
        const map = this.make.tilemap({ key: 'map' })

        const tiles = map.addTilesetImage('Plains', 'plains')

        const groundLayer = map.createLayer('Fondo', tiles, 0, 0)
        const obtaculosLayer = map.createLayer('Obstaculos', tiles)

        // COLISIONES DE MAPA
        obtaculosLayer.setCollisionByProperty({colision: true})

        this.player = new Player(this, 100, 100, 'player')

        this.cursors = this.input.keyboard.createCursorKeys()

        this.physics.add.collider(this.player, obtaculosLayer)
    }

    update(){
     this.player.update(this.cursors)   
    }
}