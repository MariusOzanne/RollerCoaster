import Player from "./Player.js";

export default class MainScene extends Phaser.Scene {
    constructor(){
        super("MainScene");
    }

    preload() {
        Player.preload(this);
        this.load.image('background', 'assets/images/background.png');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.image('spike', 'assets/images/spike.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json');
    }

    create() {
        const map = this.make.tilemap({ key: 'map' });

        const tileset = map.addTilesetImage('kenney_simple_platformer', 'tiles');

        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);

        backgroundImage.setScale(10, 1.8);
    
        const platforms = map.createStaticLayer('Platforms', tileset, 0, 200);
        const water = map.createStaticLayer('Water', tileset, 0, 200);

        platforms.setCollisionByProperty({colides:true});
        this.matter.world.convertTilemapLayer(platforms)
    
        platforms.setCollisionByExclusion(-1, true);
        this.player = new Player({scene:this,x:100,y:400,texture:'perso',frame:'idle_(1)'});
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.Z,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.Q,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })
        this.cameras.main.setBounds(0, 0, backgroundImage.displayWidth, backgroundImage.displayHeigth);
        this.cameras.main.startFollow(this.player);
    }

    update(){
        this.player.update();
    }
}