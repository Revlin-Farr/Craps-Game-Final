class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    create(){

        this.coRoll = true;
        this.point;
        this.rollnum = 0;
       
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

            this.textConfig = {
                fontSize: '28px',
                color: '#eb2525',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                
                }
                this.Text = this.add.text(game.config.width/2, game.config.height/2 - 80, 'press SPACE to roll dice', this.textConfig).setOrigin(0.5);
                this.pointText = this.add.text(game.config.width/2, game.config.height/2, 'dicesum', this.textConfig).setVisible(0).setOrigin(0.5);
               this.teext = this.add.text(game.config.width/2, game.config.height/2+110, 'Come Out Roll', this.textConfig).setOrigin(0.5);
               this.texxt = this.add.text(game.config.width/2, game.config.height/2+110, 'point', this.textConfig).setVisible(0).setOrigin(0.5);
               this.teexxt = this.add.text(game.config.width/2, game.config.height/2-80, 'Game over, press up to reset', this.textConfig).setVisible(0).setOrigin(0.5);
                
                



        // GAME OVER flag
        this.gameOver = false;
        
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.keySPACE)){
            this.shoot();
        }
        if(this.rollNumber !=this.rollnum){
        if(this.coRoll){
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
    
    shoot(){
        this.die1 = Phaser.Math.Between(1,6);
        this.die2 = Phaser.Math.Between(1,6);
        
        this.diceSum = this.die1 + this.die2;
        this.rollnum++;
        this.pointText.setText('The roll is:' +this.diceSum);
        this.pointText.setVisible(1);
        return this.diceSum;
    }


















}