export class Inventory{
    constructor(){
        this.inventory
    }

    addInventory(obj){
        if(obj instanceof Object){
            this.inventory.push(obj)
            console.log('Agregado')
        }
    }
}