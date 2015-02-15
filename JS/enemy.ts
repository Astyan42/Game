/**
 * Created by Utilisateur on 12/12/2014.
 */
module Castlevania {

    export class Enemy extends Phaser.Sprite {

        private fireRate:number;
        private fireMode:number;
        private maxBullet:number;
        private bullets:Phaser.Group;

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'heroShip', 0);
            this.angle = 180;
            this.anchor.setTo(0.5, 0.5);
            this.fireRate = 0;
            this.game.physics.arcade.enableBody(this);
            this.game.add.existing(this);
            this.bullets = new Phaser.Group(this.game,this.world,"bullet",true,true);
        }

        update() {
            this.fireRate--;
            this.body.velocity.y++;
        }

        private fire(){
            if(this.fireRate <= 0) {
                var bullet = this.game.state.getCurrentState().add.sprite(this.x, this.y - this.height, "blueLaser");
                bullet.anchor.set(0.5, 1);
                bullet.checkWorldBounds = true;
                bullet.events.onOutOfBounds.add(this.removeBullet, bullet);
                this.bullets.add(bullet);
                bullet.body.velocity.y = -2500;
                this.fireRate = 10;
            }
        }

        private removeBullet(target){
            target.kill();
        }
    }

}