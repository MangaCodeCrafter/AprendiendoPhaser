export class Bubble{
    constructor(scene, player, quote, indexDialog){
        this.scene = scene
        this.player = player
        this.quote = quote
        this.indexDialog = indexDialog
        this.bubble
        this.bubbleText
        this.bubbleGroup
    }

    create(text) {
        setCanMove(false)

        if(this.bubbleGroup) this.bubbleGroup.destroy()

        const width = 300
        const height = 75
        const arrowHeight = height / 4

        // Crear el gráfico para el fondo del globo
        this.bubble = this.scene.add.graphics({ x: this.player.x - (width / 2), y: this.player.y - (height + height * .33)})

        // Dibujar el rectángulo con esquinas redondeadas
        this.bubble.fillStyle(0xffffff, 1)
        this.bubble.fillRoundedRect(0, 0, width, height, 16)

        // Dibujar la flecha del globo
        this.bubble.fillTriangle(
            width / 2 - arrowHeight, height,
            width / 2 + arrowHeight, height,
            width / 2, height + arrowHeight
        )

        const config = {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#000000',
            align: 'center',
            wordWrap: { width: width - 2 * 10 }
        }

        this.bubbleText = this.scene.add.text(0, 0, text, config)

        // Centrar el texto dentro del globo
        const b = this.bubbleText.getBounds()

        this.bubbleText.setPosition(
            this.bubble.x + width / 2 - b.width / 2,
            this.bubble.y + height / 2 - b.height / 2
        )

        this.bubbleGroup = this.scene.add.container(0, 0, [this.bubble, this.bubbleText])
    }

    destroyBubble(){
        this.bubbleGroup.destroy()
    }

    startDialog(){
        this.i = 0

        this.create(this.quote[this.indexDialog][this.i])

        this.scene.input.keyboard.on('keydown-SPACE', this.nextDialog.bind(this))
    }

    nextDialog(){
        this.i++
        this.create(this.quote[this.indexDialog][this.i])

        if(this.i >= this.quote[this.indexDialog].length){  
            setCanMove(true)
            this.destroyBubble()
            this.scene.input.keyboard.off('keydown-SPACE')
        }
    }
}

export let canMove = false

export function setCanMove(value){
    canMove = value
}