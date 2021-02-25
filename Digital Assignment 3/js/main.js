import "./phaser.js";
import PirateScene from './PirateScene.js';
import Preloader from './preload.js';
import { config } from './config.js';
// You can copy-and-paste the code from any of the examples at https://examples.phaser.io here.
// You will need to change the `parent` parameter passed to `new Phaser.Game()` from
// `phaser-example` to `game`, which is the id of the HTML element where we
// want the game to go.
// The assets (and code) can be found at: https://github.com/photonstorm/phaser3-examples
// You will need to change the paths you pass to `this.load.image()` or any other
// loading functions to reflect where you are putting the assets.
// All loading functions will typically all be found inside `preload()`.

// The simplest class example: https://phaser.io/examples/v3/view/scenes/scene-from-es6-class

// The Majority of the code below comes from the phaser example game and everything else was found in the API for phaser.


    var game = new Phaser.Game(config);

	game.scene.add('preloader', new Preloader());
    game.scene.add('pirate', new PirateScene());
	game.scene.start('preloader');