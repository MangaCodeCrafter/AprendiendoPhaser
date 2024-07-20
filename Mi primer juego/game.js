export class Game extends Phaser.Scene {

    constructor(){
        super({ key: 'game'})
    }

    preload ()
    {
        this.load.image('moon', 'assets/environment/bg-moon.png')
        this.load.image('bg', 'assets/environment/bg-graveyard.png')
    }
    
    create ()
    {
        this.add.image(0, 0, 'moon').setOrigin(0, 0).setScale(2.08)
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(2.08)
    }
}

