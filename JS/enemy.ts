/**
 * Created by Utilisateur on 12/12/2014.
 */
module Castlevania {

    export class Enemy extends Phaser.Sprite {

        private fireRate:number;
        private fireMode:number;
        private maxBullet:number;
        private bullets:Phaser.Group;
        private isDestroyed: boolean = false;

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'enemy', 0);
            this.anchor.setTo(0.5, 0.5);
            this.fireRate = 0;
            this.game.physics.arcade.enableBody(this);
            this.bullets = new Phaser.Group(this.game,this.world,"bullet",true,true);

        }

        update() {
            this.fireRate--;
            this.body.velocity.y = 20;
        }

        private removeBullet(target){
            target.kill();
        }

        public destroyed(){
                this.isDestroyed = true;
                this.animations.add('explode');
                this.animations.play('explode', 256, false, true);

        }
    }

}