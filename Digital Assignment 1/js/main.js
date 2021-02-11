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
	this.load.image('sky', 'assets/sky.png');
    	this.load.image('ground', 'assets/platform2.png');
    	this.load.spritesheet('pink', 
        'assets/Flask_pink.png',
        { frameWidth: 32, frameHeight: 32 }
	);
	this.load.spritesheet('red', 
        'assets/Flask_red.png',
        { frameWidth: 32, frameHeight: 32 }
	);
	this.load.spritesheet('cyan', 
        'assets/Flask_cyan.png',
        { frameWidth: 32, frameHeight: 32 }
	);
	this.load.spritesheet('blue', 
        'assets/Flask_blue.png',
        { frameWidth: 32, frameHeight: 32 }
	);
	this.load.spritesheet('yellow', 
        'assets/Flask_yellow.png',
        { frameWidth: 32, frameHeight: 32 }
	);
	this.load.spritesheet('green', 
        'assets/Flask_green.png',
        { frameWidth: 32, frameHeight: 32 }
	);
    this.load.spritesheet('doctor', 
        'assets/Doctor.png',
        { frameWidth: 32, frameHeight: 32 }
	);
	this.load.audio('flask_break','assets/flask_sound.mp3')
    }

	var platforms;
    	var cursors;
	var player;
	var flasks;
	var score = 0;
	var scoreText;
	var livesText;
	var lives = 3;
	
    function create ()
    {
	
	this.add.image(400, 300, 'sky');
	scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
	livesText = this.add.text(16, 50, 'Lives: 3', { fontSize: '32px', fill: '#000' });
	platforms = this.physics.add.staticGroup();

    	platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    	platforms.create(600, 400, 'ground');
    	platforms.create(50, 250, 'ground');
    	platforms.create(750, 220, 'ground');
	
	player = this.physics.add.sprite(100, 450, 'doctor');
	flasks = this.physics.add.group();
	flasks.add(this.physics.add.sprite(100, 100, 'pink'));
	flasks.add(this.physics.add.sprite(300, 300, 'blue'));
	flasks.add(this.physics.add.sprite(750, 450, 'yellow'));
	flasks.add(this.physics.add.sprite(600, 300, 'green'));
	flasks.add(this.physics.add.sprite(700, 100, 'cyan'));
	
	player.setBounce(0.2);
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
		key: 'bubble_p',
		frames: this.anims.generateFrameNumbers('pink', {start: 1, end: 6}),
		frameRate: 30,
		repeat: -1
	});
	this.anims.create({
		key: 'bubble_r',
		frames: this.anims.generateFrameNumbers('red', {start: 1, end: 6}),
		frameRate: 30,
		repeat: -1
	});
	this.anims.create({
		key: 'bubble_c',
		frames: this.anims.generateFrameNumbers('cyan', {start: 1, end: 6}),
		frameRate: 30,
		repeat: -1
	});
	this.anims.create({
		key: 'bubble_b',
		frames: this.anims.generateFrameNumbers('blue', {start: 1, end: 6}),
		frameRate: 30,
		repeat: -1
	});
	this.anims.create({
		key: 'bubble_y',
		frames: this.anims.generateFrameNumbers('yellow', {start: 1, end: 6}),
		frameRate: 30,
		repeat: -1
	});
	this.anims.create({
		key: 'bubble_g',
		frames: this.anims.generateFrameNumbers('green', {start: 1, end: 6}),
		frameRate: 30,
		repeat: -1
	});
	
	var children = flasks.getChildren();
	
	children[0].anims.play('bubble_p');
	children[1].anims.play('bubble_b');
	children[2].anims.play('bubble_y');
	children[3].anims.play('bubble_g');
	children[4].anims.play('bubble_c');

	player.body.setGravityY(300)
	this.physics.add.collider(player, platforms);
	this.physics.add.collider(flasks, platforms);
	flasks = this.physics.add.overlap(player,flasks,grab_flask,null,this)
	cursors = this.input.keyboard.createCursorKeys();
	
    }

    function update ()
    {
	
	if (cursors.left.isDown)
	{
		player.setVelocityX(-175);

		player.anims.play('left', true);
	}
	else if (cursors.right.isDown)
	{
		player.setVelocityX(175);

		player.anims.play('right', true);
	}
	else
	{
		player.setVelocityX(0);

		if(lives <= 0){
			player.anims.play('dead');	
		}
		else{
			player.anims.play('turn');
		}
	}

	if (cursors.up.isDown && player.body.touching.down)
	{
		player.setVelocityY(-500);
	}
    }
	
	function grab_flask(player,flask){
		this.sound.add('flask_break').play();
		flask.disableBody(true, true);
		score += 10;
		if(score % 100 == 0){
			lives += 3;
			livesText.setText('Lives: ' + lives)
		}
		scoreText.setText('Score: ' + score);
		var color = Phaser.Math.Between(0,4);
		var x_cord = Phaser.Math.Between(0,800);
		var y_cord = Phaser.Math.Between(0,500);

		var red_x_cord = Phaser.Math.Between(0,800);
		var red_y_cord = Phaser.Math.Between(0,500);

		switch(color){
			case 0:
				var new_flask = this.physics.add.sprite(x_cord, y_cord, 'pink');
				new_flask.anims.play('bubble_p',true);
				break;
			case 1:
				var new_flask = this.physics.add.sprite(x_cord, y_cord, 'blue');
				new_flask.anims.play('bubble_b',true);
				break;
			case 2:
				var new_flask = this.physics.add.sprite(x_cord, y_cord, 'cyan');
				new_flask.anims.play('bubble_c',true);
				break;
			case 3:
				var new_flask = this.physics.add.sprite(x_cord, y_cord, 'green');
				new_flask.anims.play('bubble_g',true);
				break;
			case 4:
				var new_flask = this.physics.add.sprite(x_cord, y_cord, 'yellow');
				new_flask.anims.play('bubble_y',true);
				break;
		}
		this.physics.add.collider(new_flask, platforms);
		new_flask = this.physics.add.overlap(player,new_flask,grab_flask,null,this);

		var new_red_flask = this.physics.add.sprite(red_x_cord, red_y_cord, 'red');
		new_red_flask.anims.play('bubble_r',true);
		this.physics.add.collider(new_red_flask, platforms);
		this.physics.add.overlap(new_red_flask,player,grab_red,null,this);
	}

	function grab_red(flask){
		this.sound.add('flask_break').play();
		livesText.setText('Lives: ' + lives)
		flask.disableBody(true, true);
		lives = lives - 1;
		livesText.setText('lives: ' + lives)
		if (lives <= 0){
			this.physics.pause();
		}
	}

