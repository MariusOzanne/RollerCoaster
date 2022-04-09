import MainScene from "./MainScene.js";

const config = {
    width:520,
    height:520,
    backgroundColor: '#999999',
    type: Phaser.Auto,
    parent: 'platformer',
    scene:[MainScene],
    scale: {
        zoom:2,
    },
    physics: {
        default: 'matter',
        matter: {
            debug:true,
            gravity:{y:0},
        }
    },
    plugins: {
        scene:[
            {
                plugin: PhaserMatterCollisionPlugin,
                key: 'matterCollision',
                mapping: 'matterCollision'
            }
        ]
    }
}

new Phaser.Game(config)