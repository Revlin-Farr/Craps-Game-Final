class Crapout extends Phaser.Scene {
    constructor() {
        super("crapoutScene");
    }
    create(){
        this.bg = this.add.sprite(game.config.width/2, game.config.height/2,'main_bg');

        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.textConfig = {
            fontSize: '28px',
            color: '#eb2525',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
    }
    this.teext = this.add.text(game.config.width/2, game.config.height/2+110, 'Crapped out! You rolled a 2, 3, or 12.', this.textConfig).setOrigin(0.5);
    this.teexxt = this.add.text(game.config.width/2, game.config.height/2-80, 'Game over, press up to reset', this.textConfig).setOrigin(0.5);
}
update(){
    if(Phaser.Input.Keyboard.JustDown(this.keyUP)){
        this.scene.start("menuScene");
    }
}
}