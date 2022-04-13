export default class Scene1 extends Phaser.Scene {
      constructor(){
          super("bootGame");
      }

      
    preload(){
        this.load.image("clown_méchan", "./assets/images/clown_qui_fe_peur.png");

        this.load.image("clown", "./assets/images/clown.jpg");
    
        this.load.image("new_game", "./assets/images/newgame.png");
    
        this.load.image("quit", "./assets/images/quit.png");
    
        this.load.image("squid_game", "./assets/images/squid_game.png");
    
        this.load.audio("squid_game_music", "./assets/images/squid_game_ost.mp3");
    
        this.load.audio("clown_laugh", "./assets/images/laugh.mp3");
    
    
        let loadingBar = this.add.graphics({
          fillStyle: {
              color: 0xffffff //white
          }
         })
    
        this.load.on("progress", (percent)=>{
          loadingBar.fillRect(0, this.game.renderer.height/2, this.game.renderer.width * percent, 50);
    
        })
    
        this.load.on("complete", ()=>{
    
        })
    }
  
    create() {
        let logo = this.add.image(this.game.renderer.width/2, this.game.renderer.height * 0.25, "squid_game").setDepth(1);
        logo.setScale(0.7,0.7);
    
        let gameButton = this.add.image(this.game.renderer.width/2, this.game.renderer.height /2+100, "new_game").setDepth(1);
        gameButton.setScale(0.6,0.6);
    
        let quitButton = this.add.image(this.game.renderer.width/2, this.game.renderer.height /2 +250, "quit").setDepth(1);
        quitButton.setScale(0.6,0.6);
    
        let background =  this.add.image(0,0, "clown").setOrigin(0).setDepth(0);
        background.setScale(0.8, 0.6);
    
    
        let hoverSprite = this.add.sprite(250, 250, "clown_méchan");
        hoverSprite.setScale(0.4, 0.4);
        hoverSprite.setVisible(false);
    
        this.sound.play("squid_game_music", {
          loop: false
        })
    
    
        gameButton.setInteractive();
        quitButton.setInteractive();
    
        gameButton.on("pointerover", ()=>{
          hoverSprite.setVisible(true);
          this.sound.play("clown_laugh")
          hoverSprite.x = gameButton.x - gameButton.width +450;
          hoverSprite.y = gameButton.y;
        })
    
        gameButton.on("pointerout", ()=>{
          hoverSprite.setVisible(false);
        })
    
        gameButton.on("pointerup", ()=>{
            this.scene.start("MainScene");
        })
    
        quitButton.on("pointerover", ()=>{
          hoverSprite.setVisible(true);
          this.sound.play("clown_laugh")
          hoverSprite.x = quitButton.x - quitButton.width +450;
          hoverSprite.y = quitButton.y;
        })
    
        quitButton.on("pointerout", ()=>{
          hoverSprite.setVisible(false);
        })
    
        quitButton.on("pointerup", ()=>{
            this.scene.lauch();
        })
    } 
}
  