export class NPC extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setScale(2)

        this.body.setSize(this.width, this.height) // Ajusta el tamaño del área de colisión
        this.body.setOffset(this.width * 0, this.height * 0) // Ajusta el desplazamiento del área de colisión


        // ANIMACIONES
        this.anims.create({
            key: 'Idel',
            frames: this.anims.generateFrameNumbers(
                texture,
                { start: 1, end: 3 },
            ),
            repeat: -1,
            frameRate: 6
        })

        this.anims.create({
            key: 'lWalk',
            frames: this.anims.generateFrameNumbers(
                texture,
                { start: 24, end: 29 },
            ),
            repeat: -1,
            frameRate: 12
        })

        this.anims.create({
            key: 'uWalk',
            frames: this.anims.generateFrameNumbers(
                texture,
                { start: 30, end: 31 },
            ),
            repeat: -1,
            frameRate: 12
        })

        this.anims.create({
            key: 'dWalk',
            frames: this.anims.generateFrameNumbers(
                texture,
                { start: 18, end: 23 },
            ),
            repeat: -1,
            frameRate: 12
        })
    }

    Idel(){
        this.anims.play('Idel', true)
    }
}