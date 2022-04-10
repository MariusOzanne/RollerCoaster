var HealthBar = function(game, providedConfig) {
  this.game = game;

  this.setupConfiguration(providedConfig);
  this.setPosition(this.config.x, this.config.y);
  this.drawBackground();
  this.drawHealthBar();
};

console.log(HealthBar)
