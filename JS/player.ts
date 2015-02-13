/**
 * Created by Utilisateur on 12/12/2014.
 */
module Castlevania {

    export class Player extends Phaser.Sprite {

        private fireRate:number;
        private fireMode:number;
        private maxBullet:number;
        private bullets:Phaser.Group;
        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'heroShip', 0);
            this.anchor.setTo(0.5, 1);

            this.game.physics.arcade.enableBody(this);
            this.body.collideWorldBounds = true;
            this.game.add.existing(this);
            this.inputEnabled = true;
            this.input.enableDrag();
            this.events.onDragStart.add(this.onDown, this);
            this.events.onDragStop.add(this.onUp,this);
            this.bullets = new Phaser.Group(this.game,this.world,"bullet",true,true);
        }


        update() {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.body.velocity.y = -150;
            }
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.body.velocity.y = 150;
            }
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
                this.fire();
            }
        }

        private onDown(sprite,pointer) {
            this.body.moves = false;
        }

        private onUp(sprite,pointer){
            this.body.moves = true;
        }

        private fire(){
            var bullet = this.game.state.getCurrentState().add.sprite(this.x,this.y-this.height,"blueLaser");
            bullet.anchor.set(0.5,1);
            bullet.checkWorldBounds = true;
            bullet.events.onOutOfBounds.add( this.removeBullet, bullet );
            this.bullets.add(bullet);
            bullet.body.velocity.y = -2500;
        }

        private removeBullet(target){
            target.kill();
        }
    }

}