/**
 * Created by Utilisateur on 12/12/2014.
 */
module Castlevania {

    export class Player extends Phaser.Sprite {

        private fireRate:number;
        private fireMode:number;
        private maxBullet:number;
        private moveX:number;
        private moveY:number;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'heroShip', 0);
            this.anchor.setTo(0.5, 1);
            this.fireRate = 0;
            this.game.physics.arcade.enableBody(this);
            this.body.collideWorldBounds = true;
            this.game.add.existing(this);
            this.inputEnabled = true;
            this.input.enableDrag();
            this.events.onDragStart.add(this.onDown, this);
            this.events.onDragStop.add(this.onUp,this);

        }


        update() {
            this.fireRate--;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            if(this.moveX != 0 || this.moveY !=0){
                this.body.velocity.x = this.moveX;
                this.body.velocity.y = this.moveY;
                this.moveShip(0,0); // resets the move values;
            }
        }

        private onDown(sprite,pointer) {
            this.body.moves = false;
        }

        private onUp(sprite,pointer){
            this.body.moves = true;
        }

        public fire(){
            if(this.fireRate <= 0) {
                var bullet = this.game.state.getCurrentState().add.sprite(this.x, this.y - this.height, "blueLaser");
                bullet.anchor.set(0.5, 1);
                bullet.checkWorldBounds = true;
                bullet.events.onOutOfBounds.add(this.removeBullet, bullet);
                this.fireRate = 10;
                return bullet;
            }
            return null;
        }

        public moveShip(x,y){
            this.moveX = x;
            this.moveY = y;
        }

        private removeBullet(target){
            target.kill();
        }
    }

}