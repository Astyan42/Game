/// <reference path="libs/phaser.d.ts"/>;
module Castlevania {

    export class MyGame extends Phaser.Game {
       public background :Phaser.TileSprite;
        public gameWidth:number;
        public gameHeight:number;
        constructor() {
            this.gameHeight = window.innerHeight;
            this.gameWidth = window.innerWidth;
            super(this.gameWidth, this.gameHeight, Phaser.AUTO, 'content', null);
            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Level1', Level1, false);

            this.state.start('Boot');

        }

    }

}