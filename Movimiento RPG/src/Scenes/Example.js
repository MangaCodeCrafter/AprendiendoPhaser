import Player from "../Objetcs/player.js";

export class Example extends Phaser.Scene {
    constructor() {
        super({ key: 'example' });
    }


    preload() {
        this.load.image('plains', 'sprites/map/plains.png')
        this.load.image('grass', 'sprites/tilesets/grass.png')
        this.load.image('top', 'sprites/objects/objects.png')
        this.load.image('fences', 'sprites/tilesets/fences.png')

        this.load.tilemapTiledJSON('map', 'sprites/map/map.json')

        this.load.spritesheet('player', 'sprites/characters/player.png',
            { frameWidth: 48, frameHeight: 48 }
        )
    }

    create() {
        // CARGAR EL MAPA
        const map = this.make.tilemap({ key: 'map' })

        const tilesPlains = map.addTilesetImage('Plains', 'plains')
        const tilesGrass = map.addTilesetImage('Grass', 'grass')
        const tilesFences = map.addTilesetImage('fences', 'fences')
        const tilesTop = map.addTilesetImage('Trees', 'top')

        //CREAR LAS CAPAS
        const groundLayer = map.createLayer('Fondo', [tilesPlains, tilesGrass], 0, 0)
        const obtaculosLayer = map.createLayer('Obstaculos', [tilesPlains, tilesFences], 0, 0)
        const topLayer = map.createLayer('Traspasables', tilesTop, 0, 0)

        //ESCALAR LAS CAPAS
        groundLayer.setScale(2)
        obtaculosLayer.setScale(2)
        topLayer.setScale(2)

        //AJUSTE DE PROFUNDIDAD
        topLayer.setDepth(5)

        //COLISIONES DE MAPA
        obtaculosLayer.setCollisionByProperty({colision: true})
        topLayer.setCollisionByProperty({colision: true})

        //CREAR AL JUGADOR
        this.player = new Player(this, 450, 450, 'player')
        this.cursors = this.input.keyboard.createCursorKeys()

        //COLISIONES CON EL JUGADOR
        this.physics.add.collider(this.player, obtaculosLayer)
        this.physics.add.collider(this.player, topLayer)

        //CONFIGURACIÓN DE CAMARA
        this.camera = this.cameras.main
        const mapWidth = map.widthInPixels * 2
        const mapHeight = map.heightInPixels * 2

        this.camera.setBounds(0, 0, mapWidth, mapHeight)
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