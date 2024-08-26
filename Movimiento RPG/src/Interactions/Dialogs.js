import { Bubble } from "../Objetcs/bubble.js";

export class Dailogs {
    constructor(scene, player, npc){
        this.scene = scene
        this.player = player
        this.npc = npc
    }

    initDialog(){
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
            "Sos un chusma",
            "Pero gracias" 
        ]]

        new Bubble(this.scene, this.player, this.Dialog, 0).startDialog()

        // INTERACCION

        this.isNearNPC = false
        this.dialogueTriggerd = false

        this.e = this.scene.add.text(0, 0, 'Preciona espacio para charlar',{
            fontSize: '40px',
            fill: '#ffffff'
        }).setOrigin(.45).setPosition(450, 270).setVisible(false)

        this.i = 0

        this.l = this.scene.input.keyboard.on('keydown', (event) => {
            if(event.key === ' ' && this.i == 0 && this.isNearNPC){
                new Bubble(this.scene, this.npc, this.Dialog, 1).startDialog()
                this.dialogueTriggerd = true
            }
        
            if(this.isNearNPC && event.key === ' ') this.i++
        
            if (this.i - 1 == this.Dialog[1].length) {
                new Bubble(this.scene, this.player, this.Dialog, 2).startDialog() 
                this.i++
            }
        
            if (this.i == this.Dialog[1].length + this.Dialog[2].length + 2){
                this.i = 0
            }
        }) 
    }


    update(){
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