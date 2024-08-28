import { Inventory } from "../Objetcs/inventory.js"

export class InventorySystem{
    constructor(scene, player, obj){
        this.scene = scene
        this.player = player
        this.obj = obj
        this.isNearObj = false
    }

    initInventory(){
        console.log('iniciado')

        this.o = this.scene.add.text(0, 0, 'Preciona "e" para agarrar',{
            fontSize: '40px',
            fill: '#ffffff'
        }).setOrigin(.45).setPosition(1350, 270).setVisible(true)

        this.o.setDepth(1000)
        this.scene.children.bringToTop(this.o)

        this.scene.input.keyboard.on('keydown-E', this.add.bind(this))
    }

    update(){
        let distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.obj.x, this.obj.y)

        if (this.obj.active) this.isNearObj = distance < 60 ? true : false
        else this.isNearObj = false

        this.o.setVisible(this.isNearObj)
    }

    add(){
        if (this.isNearObj)
        {            
            Inventory.push(this.obj.texture.key)
            this.obj.destroy()
            console.log(Inventory)
        }
    }
}