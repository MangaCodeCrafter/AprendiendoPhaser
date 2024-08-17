export class TutorialMenu extends Phaser.Scene{
    constructor(){
        super({ key: 'tutorialMenu'})
    }

    create(){
        let move = this.add.text(0, 0, 'Para moverse usar las flechitas',{
            fontSize: '40px',
            fill: '#ffffff'
        }).setOrigin(.45).setPosition(450, 250)

        let dialog = this.add.text(0, 0, 'Para saltar diálogos usar enter o barra espaciadora',{
            fontSize: '40px',
            fill: '#ffffff',
            wordWrap: { width: 900 }
        }).setOrigin(.45).setPosition(450, 450)

        this.input.keyboard.on('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' '){
                this.scene.start('example')
            }
        })
    }

    update(){

    }
}