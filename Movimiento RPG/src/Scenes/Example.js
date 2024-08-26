import { Camera } from "../Objetcs/camera.js";
import Player from "../Objetcs/player.js";
import { NPC } from "../Objetcs/NPC.js";
import { Object } from "../Objetcs/object.js";
import { Dailogs } from "../Interactions/Dialogs.js";
import { InventorySystem } from "../Interactions/inventorySystem.js";

export class Example extends Phaser.Scene {
    constructor() {
        super({ key: 'example' })
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

        this.load.spritesheet('npc', 'sprites/characters/Sprite-0001.png',
            { frameWidth: 16, frameHeight: 16 }
        )

        this.load.spritesheet('ring', 'sprites/Prototype-images/RingSpriteSheet.png',
            { frameWidth: 16, frameHeight: 16 }
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
        const obtaculosLayer = map.createLayer('Obstaculos', [tilesPlains, tilesFences, tilesTop], 0, 0)
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

        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
            e: Phaser.Input.Keyboard.KeyCodes.E
        })

        //CREAR NPC
        this.npc = new NPC(this, 700, 300, 'npc')
        this.ring = new Object(this, 1600, 300, 'ring')
 
        //COLISIONES CON EL JUGADOR
        this.physics.add.collider(this.player, obtaculosLayer)
        this.physics.add.collider(this.player, topLayer)

        //CONFIGURACIÓN DE CAMARA
        this.camera = new Camera(this, map)

        //CONFIGURACIÓN DE DIÁLOGOS
        this.dialogs = new Dailogs(this, this.player, this.npc)
        this.dialogs.initDialog()

        //CONFIGURACIÓN DE OBJETOS E INVENTARIO
        this.xd = new InventorySystem(this, this.player, this.ring)
        this.xd.initInventory()
    }

    update(){
        this.player.update(this.cursors)   
        this.camera.update(this.player)
        this.npc.Idel()
        this.ring.Idel()
        this.dialogs.update()

        this.xd.update()
    }
}