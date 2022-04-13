export default class playerHit {
    constructor(playerHit){
    /**
     * playerHit resets the player's state when it dies from colliding with a spike
     * @param {*} player - player sprite
     * @param {*} spike - spike player collided with
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
    }
}