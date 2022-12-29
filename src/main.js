let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 360,
    scene: [Play]
}

let game = new Phaser.Game(config);

// set ui sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard varriables
let keySpace
var coRoll, point, chips, passBet, dontPassBet