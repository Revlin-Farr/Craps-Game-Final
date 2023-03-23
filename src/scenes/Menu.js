class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){ //preload assets, dice, sound etc.
        this.load.audio('sfx_dice', './assets/Dicesound.wav');
        this.load.image('main_bg', './assets/main_bg.png');
        this.load.image('button_roll', './assets/button_roll.png');
        this.load.image('dice_1', './assets/1.png');
        this.load.image('dice_2', './assets/2.png');
        this.load.image('dice_3', './assets/3.png');
        this.load.image('dice_4', './assets/4.png');
        this.load.image('dice_5', './assets/5.png');
        this.load.image('dice_6', './assets/6.png');
        this.load.spritesheet("dice_sheet", "./assets/dice.png", { frameWidth: 64, frameHeight: 64 });
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
    this.startText = this.add.text(game.config.width/2, game.config.height/2+110, 'To begin press the up arrow.', this.textConfig).setOrigin(0.5);
    this.instructionsPt2 = this.add.text(game.config.width/2, game.config.height/2-80, 'press the "Shoot!" button.', this.textConfig).setOrigin(0.5); 
    this.instructionsPt1 = this.add.text(game.config.width/2, game.config.height/2-110, 'To roll the dice,', this.textConfig).setOrigin(0.5);
}
update(){
    if(Phaser.Input.Keyboard.JustDown(this.keyUP)){
        this.scene.start("playScene");
    }
}

}