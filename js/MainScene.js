const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 2560,
    heigth: 1600,
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: 'game',
      zoom: 0.8,
    },
    scene: {
      preload,
      create,
      update,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 500 },
      },
    }
  };

  this.updateStamina = function(stamina){
        {
            this.stamina = stamina;
            if(this.isLoaded)
            {
                if(this.stamina > 0)
                {
                    this.yellow_bar_width = this.stamina * 100 / 100;
                    var repeatStamVal = Math.abs((this.yellow_bar_width - this.yellow_bar.frame.cutWidth) - 1);
                    var s_conf = {
                        callback: function(){
                            if(this.yellow_bar.frame.cutWidth > this.yellow_bar_width)
                            {
                                
                                this.yellow_bar.frame.cutWidth -= 1;
                                this.yellow_bar.setCrop(0, 0, this.yellow_bar.frame.cutWidth, 32);
                            }
                            else if(this.yellow_bar.frame.cutWidth < this.yellow_bar_width)
                            {
                                
                                this.yellow_bar.frame.cutWidth += 1;
                                this.yellow_bar.setCrop(0, 0, this.yellow_bar.frame.cutWidth, 32);
                            }
                        },
                        delay: 1,
                        repeat: repeatStamVal,
                        callbackScope: this
                    }
                    this.time.addEvent(new Phaser.Time.TimerEvent(s_conf));
                }
                else
                {
                    this.yellow_bar.frame.cutWidth = 0;
                }
            }
        }
    }

  
  const game = new Phaser.Game(config);
  
  function preload() {

    this.load.image('background', 'assets/images/background.png');

    this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');

    this.load.image('spike', 'assets/images/spike.png');
    this.load.image('spike2', 'assets/images/spike2.png');
    this.load.image('spike3', 'assets/images/spike3.png');

    this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json');

    this.load.atlas('player', 'assets/images/perso.png',
      'assets/images/perso_atlas.json');

    //this.load.spritesheet('stamina_bar', '', {frameWidth: 128, frameHeight: 32}); ---> trouver asset pour bar de stamina
}
  
  function create() {

    const map = this.make.tilemap({ key: 'map' });

    const tileset = map.addTilesetImage('kenney_simple_platformer', 'tiles');

    const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);

    backgroundImage.setScale(30, 1.5);
 
    const platforms = map.createStaticLayer('Platforms', tileset, 0, 100);
    const water = map.createStaticLayer('Water', tileset, 0, 100);

    platforms.setCollisionByExclusion(-1, true);
  
   
    this.player = this.physics.add.sprite(50, 1100, 'player');
    this.player.setBounce(0.1); 
    // this.player.setCollideWorldBounds(true); 
    this.physics.add.collider(this.player, platforms);
    this.player.setScale(1, 1);
    this.cameras.main.setBounds(0, 0, backgroundImage.displayWidth, backgroundImage.displayHeigth);
    this.cameras.main.startFollow(this.player);

    ////bar de stamina ///

    this.orange_bar = this.add.sprite(80, 80, 'stamina_bar', 1);
    this.yellow_bar = this.add.sprite(80, 80, 'stamina_bar', 0);
        
    this.textures.get('stamina_bar').add('front_bar', 0, 0, 0, 128, 32);
    this.textures.get('stamina_bar').add('back_bar', 0, 0, 32, 128, 32);
    this.orange_bar.setFrame('back_bar');
    this.yellow_bar.setFrame('front_bar');


    this.isLoaded = true;

    // this.anims.create({
    //   key: 'idle',
    //   frames: this.anims.generateFrameNames('perso', {
    //     prefix: 'idle_',
    //     start: 1,
    //     end: 15,
    //   }),
    //   frameRate: 10,
    //   repeat: -1
    // });

  
    // this.anims.create({
    //   key: 'run_',
    //   frames: [{ key: 'perso', frame: 'run_' }],
    //   frameRate: 10,
    // });

    // this.anims.create({
    //   key: 'jump_',
    //   frames: [{ key: 'perso', frame: 'jump_' }],
    //   frameRate: 10,
    // });

    this.cursors = this.input.keyboard.createCursorKeys();
  
    this.spikes = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
  
    map.getObjectLayer('Spikes').objects.forEach((spike) => {
      const spikeSprite = this.spikes.create(spike.x, spike.y + 100 - spike.height, 'spike').setOrigin(0);
      spikeSprite.body.setSize(spike.width, spike.height - 20).setOffset(0, 20);
    });

    this.physics.add.collider(this.player, this.spikes, playerHit, null, this);

    this.spikes2 = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
  
    map.getObjectLayer('Spikes2').objects.forEach((spike2) => {
      const spikeSprite = this.spikes2.create(spike2.x -64, spike2.y + 160 - spike2.height, 'spike2').setOrigin(0);
      spikeSprite.body.setSize(spike2.width, spike2.height - 20).setOffset(0, 20);
    });
  
    this.physics.add.collider(this.player, this.spikes2, playerHit, null, this);

    // this.spikes3 = this.physics.add.group({
    //   allowGravity: false,
    //   immovable: true
    // });
  
    // map.getObjectLayer('Spikes3').objects.forEach((spike3) => {
    //   const spikeSprite = this.spikes3.create(spike3.x -64, spike2.y + 160 - spike3.height, 'spike3').setOrigin(0);
    //   spikeSprite.body.setSize(spike3.width, spike3.height - 20).setOffset(0, 20);
    // });
  
    // this.physics.add.collider(this.player, this.spikes3, playerHit, null, this);
  }
  
  function update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-450);
      if (this.player.body.onFloor()) {
        this.player.play('walk', true);
      }
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(450);
      if (this.player.body.onFloor()) {
        this.player.play('walk', true);
      }
    } else {
      this.player.setVelocityX(0);
      if (this.player.body.onFloor()) {
        this.player.play('idle', true);
      }
    }
    if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
      this.player.setVelocityY(-450);
      this.player.play('jump', true);
    }
  
    if (this.player.body.velocity.x > 0) {
      this.player.setFlipX(false);
    } else if (this.player.body.velocity.x < 0) {
      this.player.setFlipX(true);
    }
  }
  
  /**
   * playerHit resets the player's state when it dies from colliding with a spike
   * @param {*} player - player sprite
   * @param {*} spike - spike player collided with
   * @param {*} spike2 - spike player collided with
   * @param {*} spike3 - spike player collided with
   */

  function playerHit(player, spike) {
    player.setVelocity(0, 0);
    player.setX(50);
    player.setY(300);
    player.play('idle', true);
    player.setAlpha(0);
    let tw = this.tweens.add({
      targets: player,
      alpha: 1,
      duration: 100,
      ease: 'Linear',
      repeat: 5,
    });
  }
 