import Phaser from 'Phaser'

const config = {
    type: Phaser.AUTO,
    width: 10000,
    height: 600,
    physics: {
        default: 'arcade',
        arcade:{
            gravity: { y:200 }
        }
    },
    scene: [GameScene]
}

export default new Phaser.Game(config)