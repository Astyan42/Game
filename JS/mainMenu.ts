/**
 * Created by Utilisateur on 12/12/2014.
 */
module Castlevania {

    export class MainMenu extends Phaser.State {

        logo: Phaser.Sprite;

        create() {

            (<MyGame>this.game).background = this.game.add.tileSprite(0, 0, this.world.width,this.world.height, 'blueBackground');

            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);

            (<MyGame>this.game).background.autoScroll(2,2);
            this.add.tween(this.logo).to({ y: this.world.centerY }, 2000, Phaser.Easing.Elastic.Out, true, 2000);

            this.input.onDown.addOnce(this.fadeOut, this);

        }

        touchstart(){
            this.fadeOut();
        }
        fadeOut() {

            this.add.tween((<MyGame>this.game).background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);

            tween.onComplete.add(this.startGame, this);

        }

        startGame() {
            this.game.state.start('Level1', true, false);
        }

    }

}