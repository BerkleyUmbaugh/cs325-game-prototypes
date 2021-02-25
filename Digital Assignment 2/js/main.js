import "./phaser.js";

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

    var config = {
    
	type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
		}
	};

    var game = new Phaser.Game(config);

    function preload ()
    {
	this.load.image('cover', 'assets/cover.png');
	this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform2.png');
    	
	this.load.spritesheet('cyan', 
        'assets/Flask_cyan.png',
        { frameWidth: 32, frameHeight: 32 }
	);
    this.load.spritesheet('doctor', 
        'assets/Doctor.png',
        { frameWidth: 32, frameHeight: 32 }
	);
	this.load.audio('drink','assets/minecraft-drinking-sound-effect.mp3')
    }

	var platforms;
    var cursors;
	var player;
	var flasks;
	var rand_keys = pick_keys();
	var win = 0;
	var lose = 0;
	var timer;
	var time_left;
	var cover;
	var left;
	var right;
	var jump;
	var gameover;
    function create ()
    {
	this.add.image(400, 300, 'sky');
	time_left = this.add.text(50, 40,"Time remaining: 1");
	left = this.add.text(600, 40,"Move left: ");
	right = this.add.text(600, 70,"Move right: ");
	jump = this.add.text(600, 100,"jump: ");
	gameover = this.add.text(300,200,"");

	time_left.setColor('black');
	left.setColor('black');
	right.setColor('black');
	jump.setColor('black');
	gameover.setColor('black');

	timer = this.time.delayedCall(20000, game_over, [],this)
	timer.paused = true;
    platforms = this.physics.add.staticGroup();

    	platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    	platforms.create(600, 400, 'ground');
    	platforms.create(50, 250, 'ground');
    	//platforms.create(750, 220, 'ground');
	
	player = this.physics.add.sprite(700, 450, 'doctor');
	flasks = this.physics.add.group();
	flasks.add(this.physics.add.sprite(100, 100, 'cyan'));
	
	player.setCollideWorldBounds(true);

	this.anims.create({
		key: 'left',
		frames: this.anims.generateFrameNumbers('doctor', { start: 4, end: 6 }),
		frameRate: 10,
		repeat: -1
	});

	this.anims.create({
		key: 'turn',
		frames: [ { key: 'doctor', frame: 0 } ],
		frameRate: 20
	});

	this.anims.create({
		key: 'right',
		frames: this.anims.generateFrameNumbers('doctor', { start: 1, end: 3 }),
		frameRate: 10,
		repeat: -1
	});
	
	this.anims.create({
		key: 'dead',
		frames: [ {key: 'doctor', frame: 7} ],
		frameRate: 10,
		repeat: -1
	});
	

	this.anims.create({
		key: 'bubble_c',
		frames: this.anims.generateFrameNumbers('cyan', {start: 1, end: 6}),
		frameRate: 30,
		repeat: -1
	});
	
	var children = flasks.getChildren();
	
	children[0].anims.play('bubble_c');


	player.body.setGravityY(300)
	this.physics.add.collider(player, platforms);
	this.physics.add.collider(flasks, platforms);
	flasks = this.physics.add.overlap(player,flasks,grab_flask,null,this)
	var temp_str = rand_keys[0]+","+rand_keys[1]+","+rand_keys[2];
	cursors = this.input.keyboard.addKeys(temp_str);

	this.input.mouse.disableContextMenu();

    this.input.on('pointerup', function (pointer) {

        if (pointer.leftButtonReleased()){
            start_game();
        }
    });

	cover = this.add.image(400,300, 'cover');
	//player.sprite.body.moves = false;

	//console.log(test2);

    }

    function update ()
    {
	time_left.setText('Time Remaining: ' + (20 - parseInt(20*timer.getProgress().toString().substr(0, 4))));
	
	if (cursors[rand_keys[0]].isDown && lose != 1)
	{
		player.setVelocityX(-175);
		left.setText("Move left: " + rand_keys[0]);
		player.anims.play('left', true);
	}
	else if (cursors[rand_keys[1]].isDown && lose != 1)
	{
		player.setVelocityX(175);
		right.setText("Move right: " + rand_keys[1]);
		player.anims.play('right', true);
	}
	else
	{
		player.setVelocityX(0);

		if(lose){
			player.anims.play('dead');	
		}
		else{
			player.anims.play('turn');
		}
	}

	if (cursors[[rand_keys[2]]].isDown && player.body.touching.down && lose != 1)
	{
		player.setVelocityY(-475);
		jump.setText("jump: " + rand_keys[2]);
	}
    }
	function pick_keys(){
		var all_keys = ["A","B","C","D","E","F",
						"G","H","I","J","K","L",
						"M","N","O","P","Q","R",
						"S","T","U","V","W","X",
						"Y","Z","SPACE","ZERO","ONE",
						"TWO","THREE","FOUR","FIVE",
						"SIX","SEVEN","EIGHT","NINE"];
		var key1;
		var key2;
		var key3;
		while(1){
			key1 = Phaser.Math.Between(0, all_keys.length - 1);
			key2 = Phaser.Math.Between(0, all_keys.length - 1);
			key3 = Phaser.Math.Between(0, all_keys.length - 1);
			if (key1 != key2 && key1 != key3 && key2 != key3){
				break;
			}
		}
		return [all_keys[key1],all_keys[key2],all_keys[key3]];
	}

	function grab_flask(player,flask){
		flask.disableBody(true, true);
		win = 1;
		this.sound.add('drink').play();
	}

	function game_over(){
		
		if (win){
			gameover.setText("YOU SURVIVED!")
		}
		else{
			lose = 1;
			gameover.setText("YOU DIED")
			left.setText("Move left: " + rand_keys[0]);
			right.setText("Move right: " + rand_keys[1]);
			jump.setText("jump: " + rand_keys[2]);
		}
	}
	function start_game(){
		timer.paused = false;
		cover.destroy();
	}