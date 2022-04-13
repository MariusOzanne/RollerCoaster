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
    scene: [Scene1, Scene2],
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 500 },
      },
    }
  };
  
  const game = new Phaser.Game(config);