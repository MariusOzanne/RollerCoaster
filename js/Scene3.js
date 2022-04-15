export default class Scene3 extends Phaser.Scene {
    constructor(){
        super("end");
    }

    preload ()
    {
      this.load.image("end", "./assets/images/end.jpg");
      this.load.image("text_end", "./assets/images/the_end.png");
      this.load.image("clown", "./assets/images/le_plout.png");
      this.load.image("perso", "./assets/images/perso1.png");
      this.load.audio("circle", "./assets/images/circle.mp3");
      this.load.audio("aughh", "./assets/images/augh.mp3");
    }
  
    create ()
    {
      let background =  this.add.image(0,0, "end").setOrigin(0).setDepth(0);
      background.setScale(2, 1.3);
  
      let theEndText = this.add.image(this.game.renderer.width/2+10, this.game.renderer.height /2.8, "text_end").setDepth(1);
      theEndText.setScale(0.6,0.6);
  
      let clown = this.add.image(this.game.renderer.width/2+90, this.game.renderer.height /2+150, "clown").setDepth(1);
      clown.setScale(1,1);
  
      let perso = this.add.image(this.game.renderer.width/2-50, this.game.renderer.height /2+220, "perso").setDepth(1);
      perso.setScale(2.5,2.5);
      perso.angle = -90;
  
      this.sound.play("circle", {
             loop: true
      })
      this.sound.play("aughh", {
          loop: false
          
      })
    }
}