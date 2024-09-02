const assetsConfig = {
    images: {
        plains: 'sprites/map/plains.png',
        grass: 'sprites/tilesets/grass.png',
        top: 'sprites/objects/objects.png',
        fences: 'sprites/tilesets/fences.png'
    },
    spritesheets: {
        player: {
            key: 'player',
            path: 'sprites/characters/player.png',
            frameWidth: 48, 
            frameHeight: 48
        },
        npc: {
            key: 'npc',
            path: 'sprites/characters/Sprite-0001.png',
            frameWidth: 16, 
            frameHeight: 16
        },
        ring: {
            key: 'ring',
            path: 'sprites/Prototype-images/RingSpriteSheet.png',
            frameWidth: 16, 
            frameHeight: 16
        }
    },
    maps: {
        map: 'sprites/map/map.json'
    }
}

export default assetsConfig