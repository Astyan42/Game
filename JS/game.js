var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Utilisateur on 12/12/2014.
*/
var Castlevania;
(function (Castlevania) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/loader.png');
        };

        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;

            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
            } else {
                //  Same goes for mobile settings.
            }
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    Castlevania.Boot = Boot;
})(Castlevania || (Castlevania = {}));
/// <reference path="libs/phaser.d.ts"/>;
var Castlevania;
(function (Castlevania) {
    var MyGame = (function (_super) {
        __extends(MyGame, _super);
        function MyGame() {
            this.gameHeight = window.innerHeight;
            this.gameWidth = window.innerWidth;
            _super.call(this, this.gameWidth, this.gameHeight, Phaser.AUTO, 'content', null);
            this.state.add('Boot', Castlevania.Boot, false);
            this.state.add('Preloader', Castlevania.Preloader, false);
            this.state.add('MainMenu', Castlevania.MainMenu, false);
            this.state.add('Level1', Castlevania.Level1, false);

            this.state.start('Boot');
        }
        return MyGame;
    })(Phaser.Game);
    Castlevania.MyGame = MyGame;
})(Castlevania || (Castlevania = {}));
/**
* Created by Utilisateur on 12/12/2014.
*/
window.onload = function () {
    var game = new Castlevania.MyGame();
};
/**
* Created by Utilisateur on 12/12/2014.
*/
var Castlevania;
(function (Castlevania) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
        }
        Level1.prototype.create = function () {
            this.game.background = this.game.add.tileSprite(0, 0, this.world.width, this.world.height, 'blueBackground');
            this.game.background.alpha = 0;
            this.game.background.autoScroll(0, 60);
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            var tweenFadeBackgroundIn = this.add.tween(this.game.background).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            tweenFadeBackgroundIn.onComplete.add(this.showStage, this);
        };

        Level1.prototype.showStage = function () {
            this.player = new Castlevania.Player(this.game, this.world.centerX, this.world.height);
        };
        return Level1;
    })(Phaser.State);
    Castlevania.Level1 = Level1;
})(Castlevania || (Castlevania = {}));
/**
* Created by Utilisateur on 12/12/2014.
*/
var Castlevania;
(function (Castlevania) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.game.background = this.game.add.tileSprite(0, 0, this.world.width, this.world.height, 'blueBackground');

            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);

            this.game.background.autoScroll(2, 2);
            this.add.tween(this.logo).to({ y: this.world.centerY }, 2000, Phaser.Easing.Elastic.Out, true, 2000);

            this.input.onDown.addOnce(this.fadeOut, this);
        };

        MainMenu.prototype.touchstart = function () {
            this.fadeOut();
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.game.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);

            tween.onComplete.add(this.startGame, this);
        };

        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level1', true, false);
        };
        return MainMenu;
    })(Phaser.State);
    Castlevania.MainMenu = MainMenu;
})(Castlevania || (Castlevania = {}));
/**
* Created by Utilisateur on 12/12/2014.
*/
var Castlevania;
(function (Castlevania) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'heroShip', 0);
            this.anchor.setTo(0.5, 1);

            this.game.physics.arcade.enableBody(this);
            this.body.collideWorldBounds = true;
            this.game.add.existing(this);
            this.inputEnabled = true;
            this.input.enableDrag();
            this.events.onDragStart.add(this.onDown, this);
            this.events.onDragStop.add(this.onUp, this);
            this.bullets = new Phaser.Group(this.game, this.world, "bullet", true, true);
        }
        Player.prototype.update = function () {
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
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.body.velocity.y = 150;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.fire();
            }
        };

        Player.prototype.onDown = function (sprite, pointer) {
            this.body.moves = false;
        };

        Player.prototype.onUp = function (sprite, pointer) {
            this.body.moves = true;
        };

        Player.prototype.fire = function () {
            var bullet = this.game.state.getCurrentState().add.sprite(this.x, this.y - this.height, "blueLaser");
            bullet.anchor.set(0.5, 1);
            bullet.checkWorldBounds = true;
            bullet.events.onOutOfBounds.add(this.removeBullet, bullet);
            this.bullets.add(bullet);
            bullet.body.velocity.y = -2500;
        };

        Player.prototype.removeBullet = function (target) {
            target.kill();
        };
        return Player;
    })(Phaser.Sprite);
    Castlevania.Player = Player;
})(Castlevania || (Castlevania = {}));
/**
* Created by Utilisateur on 12/12/2014.
*/
var Castlevania;
(function (Castlevania) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
            this.preloadBar.anchor.set(0.5, 0.5);
            this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets
            this.load.image('logo', 'assets/logo.png');
            this.load.audio('music', 'assets/title.mp3', true);
            this.load.image('heroShip', 'assets/PNG/playerShip3_blue.png');
            this.load.image('blueBackground', 'assets/backgrounds/blue.png');
            this.load.image('blueLaser', 'assets/PNG/Lasers/laserBlue01.png');
        };

        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };

        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    Castlevania.Preloader = Preloader;
})(Castlevania || (Castlevania = {}));
