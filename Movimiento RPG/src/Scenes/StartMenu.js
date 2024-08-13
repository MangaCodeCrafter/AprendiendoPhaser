export class StartMenu extends Phaser.Scene{
    constructor(){
        super({ key: 'startMenu'})
    }

    create(){
        let title = this.add.text(0, 0, 'El tipo adventure',{
            fontSize: '60px',
            fill: '#ffffff'
        }).setOrigin(.45).setPosition(450, 250)

        let subTitle = this.add.text(0, 0, 'el videojuego',{
            fontSize: '30px',
            fill: '#ffffff'
        }).setOrigin(.45).setPosition(450, 300)

        let continues = this.add.text(0, 0, 'Apreta enter o espacio para continuar',{
            fontSize: '30px',
            fill: '#ffffff'
        }).setOrigin(.45).setPosition(450, 700)

        this.input.keyboard.on('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' '){
                this.scene.start('tutorialMenu')
            }
        })
    }

    update(){

    }
}