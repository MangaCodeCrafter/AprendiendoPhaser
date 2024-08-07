export class Camera {
    constructor(scene, map){
        this.scene = scene
        this.map = map
        this.camera = scene.cameras.main
        this.configure()
    }

    configure() {
        const mapWidth = this.map.widthInPixels * 2
        const mapHeight = this.map.heightInPixels * 2

        this.camera.setBounds(0, 0, mapWidth, mapHeight)
    }

    setScroll(x, y) {
        this.camera.setScroll(x, y)
    }

    get worldView() {
        return this.camera.worldView
    }

    update(player){

        const X = this.camera.worldView.x
        const Y = this.camera.worldView.y

        let newScrollx = X
        let newScrolly = Y
        
        if (player.x > X|| player.x < X)
            {
                if (player.x >= 960 ){
                    newScrollx += 1440
                }
                else if (player.x <= 960){
                    newScrollx -= 1440
                }
            }
        
        if (player.y > Y|| player.y < Y)
            {    
                if (player.y >= 960){
                    newScrolly += 1440
                }
                else if (player.y < 960){ 
                    newScrolly -= 1440
                }
            }

        this.camera.setScroll(newScrollx, newScrolly)
    }
}