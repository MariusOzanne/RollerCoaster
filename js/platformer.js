import MainScene from "./MainScene.js";
import bootGame from "./Scene1.js";


const config = {
    width: 2560,
    heigth: 1600,
    backgroundColor: '#999999',
    type: Phaser.Auto,
    parent: 'platformer',
    scene:[bootGame, MainScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game',
        zoom: 0.8,
    },
    physics: {
        default: 'matter',
        matter: {
            debug:true,
            gravity:{y:10},
        }
    },
}

new Phaser.Game(config)