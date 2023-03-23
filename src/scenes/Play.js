class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    create(){

        this.coRoll = true;
        this.point;
        this.rollnum = 0;
        this.bg = this.add.sprite(game.config.width/2, game.config.height/2,'main_bg');
        
        this.button_roll = this.add.sprite(game.config.width/2+210, game.config.height/2-10,'button_roll');
        this.button_roll.setInteractive({
            useHandCursor: true,
        });

        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        this.die1Sprite = this.add.sprite(game.config.width / 2 - 140, game.config.height / 2 + 50, 'dice_1');
        this.die2Sprite = this.add.sprite(game.config.width/2-10, game.config.height/2, 'dice_1');
        
        // animation config
        this.anims.create({
            key: 'roll',
            frames: this.anims.generateFrameNumbers('dice_sheet', { start: 0, end: 5, first: 0}),
            frameRate: 10
        });

        this.input.on('gameobjectdown', (pointer, gameObject, event, game) => {
            if (!this.gameOver) {
                if (gameObject == this.button_roll){
                    this.shoot();
                }   
            }});

            this.textConfig = {
                fontSize: '28px',
                color: '#eb2525',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                
                }
               this.teext = this.add.text(game.config.width/2, game.config.height/2+110, 'Come Out Roll', this.textConfig).setOrigin(0.5);
               this.texxt = this.add.text(game.config.width/2, game.config.height/2+110, 'point', this.textConfig).setVisible(0).setOrigin(0.5);
               this.teexxt = this.add.text(game.config.width/2, game.config.height/2-80, 'Game over, press up to reset', this.textConfig).setVisible(0).setOrigin(0.5);
                
                



        // GAME OVER flag
        this.gameOver = false;
        
    }

    update(){
        console.log(this.point,this.coRoll,this.gameOver, this.diceSum);
        if(this.rollNumber !=this.rollnum){
        if(this.coRoll){
            if (this.diceSum == 2 || this.diceSum == 3 || this.diceSum == 12){
                this.gameOver = true;
                this.scene.start("crapoutScene");
            }
            if(this.diceSum == 4 || this.diceSum == 5 || this.diceSum == 6 || this.diceSum == 8 || this.diceSum == 9 || this.diceSum == 10 || this.diceSum == 11){
                this.point = this.diceSum;
                this.coRoll= false;
                this.rollNumber = this.rollnum
                this.texxt.setText('The Point is:' + this.point)
                this.texxt.setVisible(1)
                this.teext.setVisible(0)
                
            }
        }
    }
        if (!this.coRoll){
            
            if (this.diceSum == 7){
                this.gameOver = true;
                this.scene.start("sevenoutScene");
                this.texxt.setText("Seven out! You rolled a 7.")
            }
            if(this.point == this.diceSum && this.rollNumber !=this.rollnum ){
                this.coRoll = true;
                this.point = 0;
                this.rollNumber = this.rollnum;
                this.texxt.setVisible(0);
                this.teext.setVisible(1);
            }
        }
        if(this.gameOver){
            this.teexxt.setVisible(1);
            this.diceSum = 0;
        if(Phaser.Input.Keyboard.JustDown(this.keyUP)){
            this.scene.start("playScene");
        }
    }
    }
    
    shoot(){ //rolls the dice
        this.die1 = Phaser.Math.Between(1,6); //rolls die 1
        this.die2 = Phaser.Math.Between(1,6); //rolls die 2
        
        this.die1Sprite.anims.play('roll'); //sets up sprites
        this.die2Sprite.anims.play('roll');
        this.sound.play('sfx_dice');

         this.die1Sprite.on('animationcomplete', () => {    // callback after anim completes
            this.die1Sprite.setFrame(this.die1 - 1);
        });
        this.die2Sprite.on('animationcomplete', () => {    // callback after anim completes
            this.die2Sprite.setFrame(this.die2 - 1);
        });

        this.diceSum = this.die1 + this.die2;
        this.rollnum++;
        return this.diceSum; //returns die total 
    }


















}