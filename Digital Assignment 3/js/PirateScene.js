"use strict";
var ball;
var shot = false
var lives = 3
var target_size = 1.0
var score = 0
var scoreText;
var livesText;
var game = 1;
var gameOver
var startOver
class PirateScene extends Phaser.Scene {

    constructor(){
        super("pirate");
        
    }
    create() {

        var ship = this.add.image(700, 530, 'ship');
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        livesText = this.add.text(16, 50, 'Lives: 3', { fontSize: '32px', fill: '#000' });
        var cannon = this.add.image(700,765, 'cannon');
        cannon.scaleY = .25;
        cannon.scaleX = .25;
        var target = this.physics.add.image(800, 300, 'target');

        ball = this.physics.add.image(690, 800, 'ball');
        ball.scaleX = .70;
        ball.scaleY = .70;
        ball.gravity = 0;
        this.physics.add.overlap(ball,target, move_target, null, this)
        this.input.on('pointermove', function (pointer) {
            cannon.rotation = Phaser.Math.Angle.Between(765,700,pointer.x,pointer.y)+.92;
            //pointer.y);
        });

        this.input.on('pointerdown', function (pointer) {
            if(shot == false){
                shot = true
                ball.setVelocityY((pointer.y-690)*3);
                ball.setVelocityX((pointer.x-800)*3);
            }
            if(game == 0){
                score = 0
                lives = 3
                shot = false
                game = 1
                livesText.setText('Lives: ' + lives)
                scoreText.setText('Score: ' + score);
                target_size = 1
                var new_x = Phaser.Math.Between(50, 950);
                var new_y = Phaser.Math.Between(50, 300);
                target.x = new_x
                target.y = new_y
                target.scaleX = target_size;
                target.scaleY = target_size;
            }
        });
    }

    update(){
        if (ball.x < 0 || ball.x > 1200 || ball.y < 0 || ball.y > 1000){
            
            ball.setVelocityY(0);
            ball.setVelocityX(0);
            ball.x = 690
            ball.y = 800
            lives -= 1;
            livesText.setText('Lives: ' + lives)
            shot = false
        }
        if (lives == 0){
            game = 0;
            shot = true
        }

    }

}

function move_target(ball, target){
    this.sound.add('flask_break').play();
    ball.setVelocityY(0);
    ball.setVelocityX(0);
    ball.x = 700
    ball.y = 765

    shot = false
    var new_x = Phaser.Math.Between(50, 950);
    var new_y = Phaser.Math.Between(50, 300);
    target.x = new_x
    target.y = new_y
    if (target_size > .30)
        target_size -= .02
    target.scaleX = target_size;
    target.scaleY = target_size;
    score += 10
    scoreText.setText('Score: ' + score);
}

export default PirateScene;