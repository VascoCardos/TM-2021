var config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
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
    //Imagens

    this.load.image('sky', 'assets/Sky2.webp');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('cloud', 'assets/cloud2.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('pimento','assets/pimento.png');
    this.load.image('casa','assets/house_big.png');
    this.load.image('arvores','assets/arvore.png');
    this.load.image('barreira','assets/barreira.png')
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
    this.load.spritesheet('dude2',
        'assets/dude2.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

//variaveis

var platforms;

var pimento;

var arvores;

var casa;

var player1;

var player2;

var nuvem;

var star;

var score = 0;
var scoreText;

var level = 0;
var leveltext;
var bomb;

var barreira;

function create ()
{

    // Imagem de fundo

    this.add.image(750, 400, 'sky').setScale(2.3);


    //Criar score

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ff0000' });
    leveltext = this.add.text(16, 48, 'Level: 0', { fontSize: '32px', fill: '#ff0000' });
    // Variaveis estaticas

    platforms = this.physics.add.staticGroup();
    casa = this.physics.add.staticGroup();
    arvores =  this.physics.add.staticGroup();
    barreira = this.physics.add.staticGroup();


    nuvem = this.physics.add.group({
        key: 'cloud',
        repeat: 0,
        setXY: { x: 200, y: 430 }
    });

    // Criar items

    player1 = this.physics.add.sprite(50, 650, 'dude');
    player2 = this.physics.add.sprite(1450, 650, 'dude2');



    arvores.create(1200, 640, 'arvores').setScale(0.3).refreshBody();
    platforms.create(400, 768, 'ground').setScale(2).refreshBody();
    platforms.create(1200, 768, 'ground').setScale(2).refreshBody();
    platforms.create(400, 625, 'casa').setScale(0.25).refreshBody();

    barreira.create(0, 400, 'barreira').setScale(1).refreshBody();
    barreira.create(800, 400, 'barreira').setScale(1).refreshBody();

    barreira.create(0, 465, 'barreira').setScale(1).refreshBody();
    barreira.create(800, 465, 'barreira').setScale(1).refreshBody();


    nuvem.children.iterate(function (child) {

        child.setBounce(1);
        child.setCollideWorldBounds(true);

        child.setVelocityX(-300);
    });






        // Criar animações players

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'left2',
        frames: this.anims.generateFrameNumbers('dude2', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn2',
        frames: [ { key: 'dude2', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right2',
        frames: this.anims.generateFrameNumbers('dude2', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Colisões

    player1.setBounce(0.2);
    player1.setCollideWorldBounds(true);


    this.physics.add.collider(player1, platforms);
    this.physics.add.collider(player1, nuvem);
    this.physics.add.collider(player1, arvores);


    player2.setBounce(0.2);
    player2.setCollideWorldBounds(true);


    this.physics.add.collider(player2, platforms);
    this.physics.add.collider(player2, nuvem);
    this.physics.add.collider(player2, arvores);

    this.physics.add.collider(nuvem, barreira);

 // Criar estrelas

    stars = this.physics.add.group({
        key: 'star',
        repeat: 5,
        setXY: { x: 12, y: 0, stepX: 270 }
    });

    stars.children.iterate(function (child) {

        child.setBounce(1);
        child.setCollideWorldBounds(true);
        child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    });

 // colisões entre estrelas

    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(stars, arvores);
    //this.physics.add.collider(nuvem, stars);
    this.physics.add.overlap(player1, stars, collectStar, null, this);
    this.physics.add.collider(player2, stars, touchstar, null, this);

 //   bombs = this.physics.add.group();
 //   this.physics.add.collider(bombs, platforms);
 //   this.physics.add.collider(bombs, nuvem);
 //   this.physics.add.collider(player1, bombs, hitBomb, null, this);

    function hitBomb (player1, bombs)
    {
        this.physics.pause();

        player1.setTint(0xff0000);

        player1.anims.play('turn');

        gameOver = true;
    }

    this.physics.add.collider(player1, player2, hitplayer, null, this);



    function touchstar(player2, star)
    {
        star.disableBody(true, true);

            var y = (player1.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var star = stars.create(y, 3, 'star');

        star.setBounce(1);
        star.setCollideWorldBounds(true);
        star.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }

    function collectStar (player1, star)
    {
        star.disableBody(true, true);

        score += 10;
        scoreText.setText('Score: ' + score);



        if (stars.countActive(true) === 0)
        {
            level += 1;
            leveltext.setText('Level: ' + level);


            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);
                child.setBounce(1);
                child.setCollideWorldBounds(true);
                child.setVelocity(Phaser.Math.Between(-200, 200), 20);
            });



            var x = (player1.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);



            /*
           var bomb = bombs.create(x, 16, 'bomb');

            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-20, 20), 20);
*/
        }
    }

}

function hitplayer(player1, player2)
{



    if (score < 1){


        this.physics.pause();

        player1.setTint(0xff0000);

        player1.anims.play('turn');

        gameOver = true;
    }
    else{


        player2.x = 1450;
        player2.y = 250;

/*
        player2.disableBody(true,true);


        player2 = this.physics.add.sprite(1450, 250, 'dude2');


        player2.setBounce(0.2);
        player2.setCollideWorldBounds(true);


        this.physics.add.collider(player2, platforms);
        this.physics.add.collider(player2, nuvem);
        this.physics.add.collider(player2, arvores);
        this.physics.add.collider(player1, player2, hitplayer, null, this);
*/


        player1.setVelocityY(-600);


        score -= 200;
        scoreText.setText('Score: ' + score);
    }
}


function update ()
{
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)
    {
        player1.setVelocityX(-200);

        player1.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player1.setVelocityX(200);

        player1.anims.play('right', true);
    }
    else
    {
        player1.setVelocityX(0);

        player1.anims.play('turn');
    }

    if (cursors.up.isDown && player1.body.touching.down)
    {
        player1.setVelocityY(-330);
    }



        cursors2 = this.input.keyboard.addKeys(
        {up2:Phaser.Input.Keyboard.KeyCodes.W,
            down2:Phaser.Input.Keyboard.KeyCodes.S,
            left2:Phaser.Input.Keyboard.KeyCodes.A,
            right2:Phaser.Input.Keyboard.KeyCodes.D});


    if (cursors2.left2.isDown)
    {
        player2.setVelocityX(-130);

        player2.anims.play('left2', true);
    }
    else if (cursors2.right2.isDown)
    {
        player2.setVelocityX(130);

        player2.anims.play('right2', true);
    }
    else
    {
        player2.setVelocityX(0);

        player2.anims.play('turn2');
    }

    if (cursors2.up2.isDown && player2.body.touching.down)
    {
        player2.setVelocityY(-330);
    }


}