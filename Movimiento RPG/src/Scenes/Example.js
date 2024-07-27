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
        // CARGAR EL MAPA
        const map = this.make.tilemap({ key: 'map' })
        const tiles = map.addTilesetImage('Plains', 'plains')

        //CREAR LAS CAPAS
        const groundLayer = map.createLayer('Fondo', tiles, 0, 0)
        const obtaculosLayer = map.createLayer('Obstaculos', tiles)

        //ESCALAR LAS CAPAS
        groundLayer.setScale(2)
        obtaculosLayer.setScale(2)

        //COLISIONES DE MAPA
        obtaculosLayer.setCollisionByProperty({colision: true})

        //CREAR AL JUGADOR
        this.player = new Player(this, 900, 900, 'player')
        this.cursors = this.input.keyboard.createCursorKeys()

        //COLISIONES CON EL JUGADOR
        this.physics.add.collider(this.player, obtaculosLayer)

        //CONFIGURACIÓN DE CAMARA
        this.camera = this.cameras.main
        const mapWidth = map.widthInPixels * 2;
        const mapHeight = map.heightInPixels * 2;

        this.camera.setBounds(0, 0, mapWidth, mapHeight);
        //this.camera.setBounds(0, 0, map.widthInPixels * 2, map.heightInPixels * 2)
    }

    update(){

    this.player.update(this.cursors)   

    const X = this.camera.worldView.x
    const Y = this.camera.worldView.y
    
    if (this.cursors.right.isDown || this.cursors.left.isDown)
        {
            if (this.player.x >= 960){
                this.camera.setScroll(1440, Y)
            }
            else if (this.player.x < 960){
                this.camera.setScroll(0, Y)
            }
        }
    
    if (this.cursors.up.isDown || this.cursors.down.isDown)
    {    
        if (this.player.y >= 960){
            this.camera.setScroll(X, 1440)
        }
        else if (this.player.y < 960){
            this.camera.setScroll(X, 0)
        }
    }
    
}
}