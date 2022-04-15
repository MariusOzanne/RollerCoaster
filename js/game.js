import menu from "./Scene1.js";
import main from "./scene2.js";
import end from "./scene3.js";


var config = {
    width: 1435,
    height: 750,
    parent: 'game',
    backgroundColor: 0x000000,
    scene: [menu, main, end]
};

var game = new Phaser.Game(config);