/**
 * Created by Utilisateur on 12/12/2014.
 */
module Castlevania {

    export class Player extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'heroShip', 0);

            this.anchor.setTo(0.5, 1);

            game.physics.arcade.enableBody(this);
            game.add.existing(this);
            this.inputEnabled = true;
            this.input.enableDrag();
            this.events.onDragStart.add(this.onDown, this);
            this.events.onDragStop.add(this.onUp,this);
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

        }

        private onDown(sprite,pointer) {
            this.body.moves = false;
        }

        private onUp(sprite,pointer){
            this.body.moves = true;
        }
    }

}