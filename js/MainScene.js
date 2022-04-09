import Player from "./Player.js";

export default class MainScene extends Phaser.Scene {
    constructor(){
        super("MainScene");
    }

    preload() {
        Player.preload(this);
        this.load.image('tiles','assets/images/Solaria.png');
        this.load.tilemapTiledJSON('map','assets/images/map.json');
    }

    create() {
        this.add.image(0, 0,'tiles') 
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('Solaria','tiles');
        map.createStaticLayer('Ground',tileset);
        map.createStaticLayer('Water',tileset);
        map.createStaticLayer('Wall',tileset);
        this.player = new Player({scene:this,x:0,y:0,texture:'male_character',frame:'walking1'});
        let textPlayer = new Player({scene:this,x:100,y:100,texture:'male_character',frame:'walking1'});
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.Z,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.Q,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })
    }

    update(){
        this.player.update();
    }
}