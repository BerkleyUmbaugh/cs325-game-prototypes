"use strict";

class Preloader extends Phaser.Scene{

    constructor(){
        super('preloader');
    }

    preload() {
        this.load.image('ship','assets/ship.png');
        this.load.image('cannon','assets/cannon1.png');
        this.load.image('ball','assets/ball2.png')
        this.load.image('target','assets/target.png')
        this.load.image('base','assets/base2.png')
        this.load.audio('flask_break','assets/flask_sound.mp3')
        this.load.audio('shoot','assets/shoot1.mp3')
        this.load.audio('splash','assets/splash1.mp3')
    }

    create() {
        this.scene.start('pirate');
    }
}

export default Preloader;