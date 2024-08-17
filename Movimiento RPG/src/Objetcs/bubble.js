export function createSpeechBubble(scene, x, y, width, height, quote) {
    const bubbleWidth = width
    const bubbleHeight = height
    const bubblePadding = 10
    const arrowHeight = bubbleHeight / 4
    let i = 0
    let bubbleGroup

    function createBubble(text) 
    {
        if (bubbleGroup) {
            bubbleGroup.destroy()  // Elimina la burbuja anterior
        }
        // Crear el gráfico para el fondo del globo
        const bubble = scene.add.graphics({ x: x - (width / 2), y: y - (height + height * .33)})

        // Dibujar el rectángulo con esquinas redondeadas
        bubble.fillStyle(0xffffff, 1)
        bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16)

        // Dibujar la flecha del globo
        bubble.fillTriangle(
            bubbleWidth / 2 - arrowHeight, bubbleHeight,
            bubbleWidth / 2 + arrowHeight, bubbleHeight,
            bubbleWidth / 2, bubbleHeight + arrowHeight
        )

        // Estilos del texto
        const config = {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#000000',
            align: 'center',
            wordWrap: { width: bubbleWidth - 2 * bubblePadding }
        }

        let bubbleText = scene.add.text(0, 0, quote[i], config)

        // Centrar el texto dentro del globo
        const b = bubbleText.getBounds();
        bubbleText.setPosition(
            bubble.x + bubbleWidth / 2 - b.width / 2,
            bubble.y + bubbleHeight / 2 - b.height / 2
        )

        // Ajuste de capas
        bubble.setDepth(10)
        bubbleText.setDepth(10)
        
        // Crear una referencia al globo y al texto para poder eliminarlos después
        bubbleGroup = scene.add.container(0, 0, [bubble, bubbleText])
    }

    createBubble(quote[i])

    // Evento que destuye la burbuja
    scene.input.keyboard.on('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') 
            {   
                i++
                if (i < quote.length)
                {
                    createBubble(quote[i])
                }     
                else{
                    bubbleGroup.destroy()
                    setCanMove(true)
                }   
            }
    })

    setCanMove(false)
} 

// Estados globales de las burbujas //

// Repasar sobre si es una practica buena o al menos aceptable.

export let canMove = false

export function setCanMove(value){
    canMove = value
}