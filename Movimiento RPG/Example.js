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
        const map = this.make.tilemap({ key: 'map' })

        const tiles = map.addTilesetImage('Plains', 'plains')

        const groundLayer = map.createLayer('Fondo', tiles, 0, 0)
        const obtaculosLayer = map.createLayer('Obstaculos', tiles)

        obtaculosLayer.setCollisionByProperty({colision: true})

        //this.player = this.add.sprite(300, 300, 'player').setOrigin(0, 0).setScale(2)
        this.player = this.physics.add.sprite(300, 300, 'player').setScale(2)

        this.player.body.setSize(this.player.width * 0.4, this.player.height * 0.5); // Ajusta el tamaño del área de colisión
        this.player.body.setOffset(this.player.width * 0.31, this.player.height * 0.43); // Ajusta el desplazamiento del área de colisión


        this.player.setCollideWorldBounds(true)

        this.anims.create({
            key: 'lWalk',
            frames: this.anims.generateFrameNumbers(
                'player',
                { start: 24, end: 29 },
            ),
            repeat: -1,
            frameRate: 12
        })

        this.anims.create({
            key: 'uWalk',
            frames: this.anims.generateFrameNumbers(
                'player',
                { start: 30, end: 35 },
            ),
            repeat: -1,
            frameRate: 12
        })

        this.anims.create({
            key: 'dWalk',
            frames: this.anims.generateFrameNumbers(
                'player',
                { start: 18, end: 23 },
            ),
            repeat: -1,
            frameRate: 12
        })

        this.keys = this.input.keyboard.createCursorKeys()

        this.physics.add.collider(this.player, obtaculosLayer)
    }

    update(){
        let velocidad = 4

        if (this.keys.left.isDown) {
            this.player.flipX = true 
            this.player.anims.play('lWalk', true)
            this.player.setVelocityX(-160);           
        }
        else if (this.keys.right.isDown) { 
            this.player.flipX = false
            this.player.anims.play('lWalk', true)
            this.player.setVelocityX(160);
        }
        else if (this.keys.up.isDown) { 
            this.player.anims.play('uWalk', true)
            this.player.setVelocityY(-160);
        }
        else if (this.keys.down.isDown) { 
            this.player.anims.play('dWalk', true)
            this.player.setVelocityY(160);
        }
        else{
            this.player.anims.stop()
            this.player.setFrame(0)
            this.player.setVelocityY(0);
            this.player.setVelocityX(0);
        }
    }
}