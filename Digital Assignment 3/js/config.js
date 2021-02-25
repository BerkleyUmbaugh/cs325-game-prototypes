import './phaser.js'
import PirateScene from './PirateScene.js'

var config = {
    key: 'game',
       type: Phaser.WebGL,
       width: 1200,
    height: 1000,
    parent: 'game',
    physics: { 
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
        }
    },
    scene: PirateScene
    
};

export { config }