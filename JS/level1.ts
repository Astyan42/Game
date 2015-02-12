/**
 * Created by Utilisateur on 12/12/2014.
 */

module Castlevania {

    export class Level1 extends Phaser.State {

        music: Phaser.Sound;
        player: Castlevania.Player;

        create() {
            (<MyGame>this.game).background = this.game.add.tileSprite(0, 0, this.world.width,this.world.height, 'blueBackground');
            (<MyGame>this.game).background.alpha = 0;
            (<MyGame>this.game).background.autoScroll(0,60);
            (<MyGame>this.game).physics.startSystem(Phaser.Physics.ARCADE);
            var tweenFadeBackgroundIn = this.add.tween((<MyGame>this.game).background).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            tweenFadeBackgroundIn.onComplete.add(this.showStage, this);
        }

        showStage(){
            this.player = new Player(this.game, this.world.centerX, this.world.height);
        }

    }

}