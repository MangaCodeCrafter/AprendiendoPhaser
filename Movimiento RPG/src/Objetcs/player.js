export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // COLISIONES
        this.setCollideWorldBounds(true)

        this.setScale(2)

        this.body.setSize(this.width * 0.4, this.height * 0.5); // Ajusta el tamaño del área de colisión
        this.body.setOffset(this.width * 0.31, this.height * 0.43); // Ajusta el desplazamiento del área de colisión


        // ANIMACIONES
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
    }

    update(cursors){
        let velocidad = 4

        if (cursors.left.isDown) {
            this.flipX = true 
            this.anims.play('lWalk', true)
            this.setVelocityX(-160);           
        }
        else if (cursors.right.isDown) { 
            this.flipX = false
            this.anims.play('lWalk', true)
            this.setVelocityX(160);
        }
        else if (cursors.up.isDown) { 
            this.anims.play('uWalk', true)
            this.setVelocityY(-160);
        }
        else if (cursors.down.isDown) { 
            this.anims.play('dWalk', true)
            this.setVelocityY(160);
        }
        else{
            this.anims.stop()
            this.setFrame(0)
            this.setVelocityY(0);
            this.setVelocityX(0);
        }
    }
}