export class Object extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setScale(2)

        this.anims.create({
            key: 'Idel',
            frames: this.anims.generateFrameNumbers(
                texture,
                { start: 1, end: 14 },
            ),
            repeat: -1,
            frameRate: 6
        })
    }
    
    Idel(){
        this.anims.play('Idel', true)
    }


}