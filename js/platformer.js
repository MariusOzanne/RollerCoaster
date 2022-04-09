import MainScene from "./MainScene.js";

const config = {
    width:800,
    height:640,
    backgroundColor: '#999999',
    type: Phaser.Auto,
    parent: 'platformer',
    scene:[MainScene],
    scale: {
        zoom:2,
        // mode: Phaser.Scale.RESIZE,
        // autoCenter: Phaser.Scale.CENTER_BOTH
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