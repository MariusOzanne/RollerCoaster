class Scene2 extends Phaser.Scene {
    constructor() {
      super("playGame");
    }

    preload(){
        this.load.image('background', 'assets/images/background.png');
    
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
    
        this.load.image('spike', 'assets/images/spike.png');
    
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json');
    
        this.load.atlas('player', 'assets/images/perso.png',
          'assets/images/perso_atlas.json');
    }
  
    create() {
  
      const map = this.make.tilemap({ key: 'map' });

      const tileset = map.addTilesetImage('kenney_simple_platformer', 'tiles');

      const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);

      backgroundImage.setScale(10, 1.8);
  
      const platforms = map.createLayer('Platforms', tileset, 0, 200);
      const water = map.createLayer('Water', tileset, 0, 200);
  
      platforms.setCollisionByExclusion(-1, true);
    
    
      this.player = this.physics.add.sprite(50, 700, 'player');
      this.player.setBounce(0.1); 
      // this.player.setCollideWorldBounds(true); 
      this.physics.add.collider(this.player, platforms);
      this.player.setScale(1, 1);
      this.cameras.main.setBounds(0, 0, backgroundImage.displayWidth, backgroundImage.displayHeigth);
      this.cameras.main.startFollow(this.player);
      
      // this.anims.create({
      //   key: 'male_character_walk1',
      //   frames: this.anims.generateFrameNames('player', {
      //     prefix: 'robo_player_',
      //     start: 2,
      //     end: 3,
      //   }),
      //   frameRate: 10,
      //   repeat: -1
      // });

    
      // this.anims.create({
      //   key: 'idle',
      //   frames: [{ key: 'player', frame: 'male_character_walk' }],
      //   frameRate: 10,
      // });

      // this.anims.create({
      //   key: 'jump',
      //   frames: [{ key: 'player', frame: 'robo_player_1' }],
      //   frameRate: 10,
      // });

      this.cursors = this.input.keyboard.createCursorKeys();
    
      this.spikes = this.physics.add.group({
        allowGravity: false,
        immovable: true
      });
    
      map.getObjectLayer('Spikes').objects.forEach((spike) => {
        const spikeSprite = this.spikes.create(spike.x, spike.y + 200 - spike.height, 'spike').setOrigin(0);
        spikeSprite.body.setSize(spike.width, spike.height - 20).setOffset(0, 20);
      });
    
      this.physics.add.collider(this.player, this.spikes, playerHit, null, this);
    }
    
    update() {
      if (this.cursors.left.isDown) {
        this.setVelocityX(-400);
        if (this.body.onFloor()) {
          this.play('walk', true);
        }
      } else if (this.cursors.right.isDown) {
        this.setVelocityX(400);
        if (this.body.onFloor()) {
          this.play('walk', true);
        }
      } else {
        this.setVelocityX(0);
        if (this.body.onFloor()) {
          this.play('idle', true);
        }
      }
      if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.body.onFloor()) {
        this.setVelocityY(-450);
        this.play('jump', true);
      }
    
      if (this.body.velocity.x > 0) {
        this.setFlipX(false);
      } else if (this.body.velocity.x < 0) {
        this.setFlipX(true);
      }
  }
  }
    
  