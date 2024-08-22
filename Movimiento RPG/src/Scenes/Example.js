import { Camera } from "../Objetcs/camera.js";
import Player from "../Objetcs/player.js";
import { Bubble, setCanMove, canMove } from "../Objetcs/bubble.js";
import { NPC } from "../Objetcs/NPC.js";
import { Object } from "../Objetcs/object.js";

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
        this.cursors = this.input.keyboard.createCursorKeys()

        //CREAR NPC
        this.npc = new NPC(this, 700, 300, 'npc')
        this.ring = new Object(this, 1600, 300, 'ring')
 
        //COLISIONES CON EL JUGADOR
        this.physics.add.collider(this.player, obtaculosLayer)
        this.physics.add.collider(this.player, topLayer)

        //CONFIGURACIÓN DE CAMARA
        this.camera = new Camera(this, map)

        //BURBUJA
        this.Dialog = [[
            "Esta es a historia de elden ring.",
            "También conocido como 'el tipo'.",
            "Que solo tiene una misión",
            "Buscar el Elden Ring",
            "Y ser Elden Ring con el Elden Ring",
            "Mejor dicho",
            "El tipo con el Elden Ring"
        ], [
            "Master",
            "Me enteré que buscas el Elden Ring",
            "Está por allá",
            "-->"
        ],[
            "Muchas gracias",
            "Sos elmas",
            "Elmas capito" 
        ]]

        new Bubble(this, this.player, this.Dialog, 0).startDialog()

        // INTERACCION

        this.isNearNPC = false
        this.dialogueTriggerd = false

        this.e = this.add.text(0, 0, 'Preciona espacio para charlar',{
            fontSize: '40px',
            fill: '#ffffff'
        }).setOrigin(.45).setPosition(450, 270).setVisible(false)

        this.i = 0

        this.input.keyboard.on('keydown', (event) => {
            if(event.key === ' ' && this.i == 0 && this.isNearNPC){
                console.log('evento')
                new Bubble(this, this.npc, this.Dialog, 1).startDialog()
                this.dialogueTriggerd = true
            }

            if(this.isNearNPC && event.key === ' ') this.i++

            if (this.i - 1 == this.Dialog[1].length) {
                new Bubble(this, this.player, this.Dialog, 2).startDialog() 
                this.i++
            }

            if (this.i == this.Dialog[1].length + this.Dialog[2].length + 2){
                this.i = 0
            }

            console.log(this.i)
        })
    }

    update(){
        this.player.update(this.cursors)   
        this.camera.update(this.player)
        this.npc.Idel()
        this.ring.Idel()

        // INTERACCION

        let distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc.x, this.npc.y)

        this.isNearNPC = distance < 60 ? true : false
 
        if(this.isNearNPC){
            this.e.setVisible(true)
            if (this.dialogueTriggerd) {this.e.setVisible(false)}
        }
        else{
            this.e.setVisible(false)
            this.dialogueTriggerd = false
        } 
    }
}