
"use strict";
var ball;
var shot = false
var lives = 5
var target
var target_size = 1.0
var target_speed = 100
var score = 0
var scoreText;
var livesText;
var game = 1;
var restart_text
var gameover_text
var stupid_fix = false
class PirateScene extends Phaser.Scene {

    constructor(){
        super("pirate");
        
    }
    create() {
        var ship = this.add.image(700, 530, 'ship');
        target = this.physics.add.image(800, 300, 'target');
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        livesText = this.add.text(16, 50, 'Lives: 5', { fontSize: '32px', fill: '#000' });
        restart_text = this.add.text(50,140, 'Click anywhere to restart',{fontSize: '32px', fill: '#000'})
        gameover_text = this.add.text(20,100, 'You Lose, get 1000 points to win',{fontSize: '34px', fill: '#000'})
        var cannon = this.add.image(710,755, 'cannon');
        restart_text.setVisible(false)
        gameover_text.setVisible(false)
        
        cannon.scaleY = .60;
        cannon.scaleX = .60;
        var base = this.add.image(704,787, 'base');
        base.scaleY = .75
        base.scaleX = .75

        ball = this.physics.add.image(690, 800, 'ball');
        ball.scaleX = .70;
        ball.scaleY = .70;
        ball.gravity = 0;
        ball.setVisible(false)
        this.physics.add.overlap(ball,target, move_target, null, this)
        this.input.on('pointermove', function (pointer) {
            cannon.rotation = Phaser.Math.Angle.Between(710,755,pointer.x,pointer.y)+1.6;
        });

        this.input.on('pointerdown', function (pointer) {
            if(shot == false){
                shot = true
                stupid_fix = true
                var special = pointer.x
                var theta = Math.atan((pointer.y-800)/(pointer.x-690))
                var vel = 1500
                if(special < 690){
                    vel *= -1
                }
                ball.setVelocityY(vel*Math.sin(theta));
                ball.setVelocityX(vel*Math.cos(theta));
                ball.setGravity(0,1250);
                ball.setVisible(true)
                
            }
            if(game == 0){
                restart_text.setVisible(false)
                gameover_text.setVisible(false)
                score = 0
                lives = 5
                shot = false
                game = 1
                livesText.setText('Lives: ' + lives)
                scoreText.setText('Score: ' + score);
                target_size = 1
                target_speed = 100
                var new_x = Phaser.Math.Between(50, 1150);
                var new_y = Phaser.Math.Between(50, 300);
                target.x = new_x
                target.y = new_y
                target.scaleX = target_size;
                target.scaleY = target_size;
            }
        });
    }

    update(){
        if (stupid_fix){
            this.sound.add('shoot', {volume: 0.5}).play();
            stupid_fix = false
        }
        if (ball.x < 0 || ball.x > 1200 || ball.y > 1000){
            ball.setVisible(false)
            ball.setGravity(0,0)
            ball.setVelocityY(0);
            ball.setVelocityX(0);
            ball.x = 690
            ball.y = 800
            if(score < 200){
                lives -= 1;
            }
            this.sound.add('splash', {volume: 0.5}).play();
            livesText.setText('Lives: ' + lives)
            shot = false
        }
        if (target.y > 1000){
            target.setVelocityY(0)
            target.setVelocityX(0)
            var new_x = Phaser.Math.Between(50, 1150);
            var new_y = 50;
            target.x = new_x
            target.y = new_y
    
            if (target_size > .30)
                target_size -= .02
            target.scaleX = target_size;
            target.scaleY = target_size;
            target.setGravity(0,300)
            lives -= 1;
            livesText.setText('Lives: ' + lives)
        }
        if (lives == 0){
            target.setGravity(0,0)
            target.setVelocityY(0)
            target.setVelocityX(0);
            game = 0;
            shot = true
            restart_text.setVisible(true)
            if(score > 990){
                gameover_text.setText('YOU WIN!')
                gameover_text.x = 170 
                gameover_text.y = 100 
            }
            else{
                gameover_text.setText('You Lose, get 1000 points to win')
                gameover_text.x = 20 
                gameover_text.y = 100 
            }
            gameover_text.setVisible(true)
        }

    }

}

function move_target(ball, target){
    ball.setVisible(false)
    this.sound.add('flask_break', {volume: 0.5}).play();
    ball.setGravity(0,0)
    ball.setVelocityY(0);
    ball.setVelocityX(0);
    target.setVelocityY(0)
    ball.x = 690
    ball.y = 800

    shot = false
    if(score == 190 || score == 390 || score == 590 || score == 790){
        target_size = 1
    }
    if(score > 180){
        var new_x = Phaser.Math.Between(50, 1150);
        var new_y = 50;
        target.x = new_x
        target.y = new_y
    
        if (target_size > .30)
            target_size -= .02
        target.scaleX = target_size;
        target.scaleY = target_size;
        if(score > 380){
            if(new_x > 690){
                target.setVelocityX(-1 * target_speed);
            }
            else{
                target.setVelocityX(target_speed);
            }
        }
        ball.setVelocityY(target_speed/-2);
        target.setGravity(0,300)
    }
    else{
        var new_x = Phaser.Math.Between(50, 1150);
        var new_y = Phaser.Math.Between(50, 300);
        target.x = new_x
        target.y = new_y
    
        if (target_size > .30)
            target_size -= .02
        target.scaleX = target_size;
        target.scaleY = target_size;
    }
    if(score > 580){
        target_speed = 200
    }
    else if(score > 780){
        target_speed = 300
    }
    else if(score > 880){
        target_speed = 400
    }
    score += 10
    scoreText.setText('Score: ' + score);
}

export default PirateScene;