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
               this.comeOutRollText = this.add.text(game.config.width/2, game.config.height/2+110, 'Come Out Roll', this.textConfig).setOrigin(0.5);
               this.pointNumber = this.add.text(game.config.width/2, game.config.height/2+110, 'point', this.textConfig).setVisible(0).setOrigin(0.5); //place holder

                
                



        // GAME OVER flag
        this.gameOver = false;
        
    }

    update(){
        console.log(this.point,this.coRoll,this.gameOver, this.diceSum);
        if(this.rollNumber !=this.rollnum){
        if(this.coRoll){
            if (this.diceSum == 2 || this.diceSum == 3 || this.diceSum == 12){ //ends the game due to crap out
                this.gameOver = true;
                this.scene.start("crapoutScene");
            }
            if(this.diceSum == 4 || this.diceSum == 5 || this.diceSum == 6 || this.diceSum == 8 || this.diceSum == 9 || this.diceSum == 10 || this.diceSum == 11){ //sets the point for future rolls and shows the point for the player
                this.point = this.diceSum;
                this.coRoll= false;
                this.rollNumber = this.rollnum
                this.pointNumber.setText('The Point is:' + this.point)
                this.pointNumber.setVisible(1)  //shows the current point
                this.comeOutRollText.setVisible(0) //no longer a come out roll, so the text is disabled
                
            }
        }
    }
        if (!this.coRoll){
            
            if (this.diceSum == 7){ //ends the game due to sevening out
                this.gameOver = true;
                this.scene.start("sevenoutScene");
            }
            if(this.point == this.diceSum && this.rollNumber !=this.rollnum ){ //if the player hits the point, it resets
                this.coRoll = true;
                this.point = 0;
                this.rollNumber = this.rollnum;
                this.pointNumber.setVisible(0); //removes the point
                this.comeOutRollText.setVisible(1); //is now a come out roll
            }
        }
        if(this.gameOver){
            this.diceSum = 0;
    }
    }
    
    shoot(){ //rolls the dice
        this.die1 = Phaser.Math.Between(1,6); //rolls die 1
        this.die2 = Phaser.Math.Between(1,6); //rolls die 2
        
        this.die1Sprite.anims.play('roll'); //sets up sprites
        this.die2Sprite.anims.play('roll');

        this.sound.play('sfx_dice'); //plays dice sound effect

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