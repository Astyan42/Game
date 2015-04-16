/**
 * Created by Utilisateur on 12/12/2014.
 */
module Castlevania {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
            this.preloadBar.anchor.set(0.5,0.5);
            this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets
            this.load.image('logo', 'assets/logo.png');
            this.load.audio('music', 'assets/title.mp3', true);
            this.load.image('heroShip', 'assets/PNG/playerShip3_blue.png');
            this.load.image('enemy', 'assets/PNG/Enemies/enemyBlack5.png');
            this.load.image('blueBackground', 'assets/backgrounds/blue.png');
            this.load.image('blueLaser', 'assets/PNG/Lasers/laserBlue01.png');
            this.load.spritesheet('explosion', 'assets/animation/explosionSpritesheet.png', 192, 192, 64);
        }

        create() {

            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);

        }

        startMainMenu() {

            this.game.state.start('MainMenu', true, false);

        }

    }

}