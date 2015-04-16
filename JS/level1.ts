/**
 * Created by Utilisateur on 12/12/2014.
 */

module Castlevania {

    export class Level1 extends Phaser.State {

        private music: Phaser.Sound;
        private player: Castlevania.Player;
        private enemies: Phaser.Group;
        private bullets:Phaser.Group;
        private keyUpIsDown:boolean;
        private keyDownIsDown:boolean;
        private keyLeftIsDown:boolean;
        private keyRightIsDown:boolean;
        private keySpaceIsDown:boolean;
        create() {
            (<MyGame>this.game).background = this.game.add.tileSprite(0, 0, this.world.width,this.world.height, 'blueBackground');
            (<MyGame>this.game).background.alpha = 0;
            (<MyGame>this.game).background.autoScroll(0,60);
            (<MyGame>this.game).physics.startSystem(Phaser.Physics.ARCADE);
            var tweenFadeBackgroundIn = this.add.tween((<MyGame>this.game).background).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            tweenFadeBackgroundIn.onComplete.add(this.showStage, this);
            this.enemies = new Phaser.Group(this.game,this.world,"enemies",true,true);
            this.bullets = new Phaser.Group(this.game,this.world,"bullet",true,true);
            this.game.input.keyboard.addCallbacks(this, this.pressKey, this.releaseKey);
        }

        pressKey(event){
            if (event.keyCode == Phaser.Keyboard.LEFT) {
                this.keyLeftIsDown=true;
            }
            if (event.keyCode ==Phaser.Keyboard.RIGHT) {
                this.keyRightIsDown=true;
            }
            if (event.keyCode == Phaser.Keyboard.UP) {
                this.keyUpIsDown=true;
            }
            if(event.keyCode == Phaser.Keyboard.DOWN) {
                this.keyDownIsDown=true;
            }
            if(event.keyCode == Phaser.Keyboard.SPACEBAR) {
                this.keySpaceIsDown=true;
            }
        }

        releaseKey(event){
            if (event.keyCode == Phaser.Keyboard.LEFT) {
                this.keyLeftIsDown=false;
            }
            if (event.keyCode ==Phaser.Keyboard.RIGHT) {
                this.keyRightIsDown=false;
            }
            if (event.keyCode == Phaser.Keyboard.UP) {
                this.keyUpIsDown=false;
            }
            if(event.keyCode == Phaser.Keyboard.DOWN) {
                this.keyDownIsDown=false;
            }
            if(event.keyCode == Phaser.Keyboard.SPACEBAR) {
                this.keySpaceIsDown=false;
            }
        }


        showStage(){
            this.player = new Player(this.game, this.world.centerX, this.world.height);
        }

        update(){
            if(this.enemyHasToAppear()){
                this.enemies.add(new Enemy(this.game,this.world.centerX,0));
            }
            var moveShipX = 0;
            var moveShipY = 0;
            if(this.keyUpIsDown){
                moveShipY = -150;
            }
            if(this.keyDownIsDown){
                moveShipY = 150;
            }
            if(this.keyLeftIsDown){
                moveShipX = -150;
            }
            if(this.keyRightIsDown){
                moveShipX = 150;
            }
            if(this.keySpaceIsDown){
                if(this.player) {
                    var bullet = this.player.fire();
                }
                if(bullet){
                    this.bullets.add(bullet);
                    bullet.body.velocity.y = -2500;
                }
            }
            if(this.keyDownIsDown || this.keyLeftIsDown || this.keyRightIsDown || this.keyUpIsDown){
               if(this.player){
                    this.player.moveShip(moveShipX,moveShipY);
               }
            }
            this.checkCollision();
        }

        enemyHasToAppear(){
            // 1 % chance to pop an enemy
            if(Math.random() >= 0.99){
                return true;
            }
            return false;
        }

        checkCollision(){
            this.game.physics.arcade.collide(this.enemies,this.bullets,this.killEnemy,null,this);
        }

        killEnemy(ship,bullet){
            ship.kill();
            bullet.kill();
        }


    }

}