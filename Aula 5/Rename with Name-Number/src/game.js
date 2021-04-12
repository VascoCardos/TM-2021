// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');

var player;
var barreira;


// load asset files for our game
gameScene.preload = function() {
  // load images
  this.load.image('background', 'assets/newbackground2.png');
  this.load.image('dragon', 'assets/dragon.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('treasure', 'assets/treasure.png');
  this.load.image('barreira', 'assets/barreira.png');
  this.load.image('barreira2', 'assets/barreira2.png');
  this.load.image('barreira3', 'assets/barreira3.png');


};

// executed once, after assets were loaded
gameScene.create = function() {
  // background
  let bg = this.add.sprite(0, 0, 'background');

  bg.setOrigin(0,0);





  barreira = this.physics.add.staticGroup();

  player = this.physics.add.sprite(70, this.sys.game.config.height *3/4 + 30, 'player');

  player.setScale(0.5);

  this.treasure = this.add.sprite(this.sys.game.config.width/2 +80, this.sys.game.config.height *3/4 + 90, 'treasure');

  this.treasure.setScale(0.6);

  player.setCollideWorldBounds(true);

  barreira.create(500,50, 'barreira').setScale(1).refreshBody();

  barreira.create(500,this.sys.game.config.height-50, 'barreira').setScale(1).refreshBody();

  barreira.create(this.sys.game.config.width-33,500, 'barreira3').setScale(1).refreshBody();
  barreira.create(33,500, 'barreira3').setScale(1).refreshBody();
  barreira.create(640,480, 'barreira3').setScale(0.30).refreshBody();
  barreira.create(660,480, 'barreira3').setScale(0.30).refreshBody();
  barreira.create(680,480, 'barreira3').setScale(0.30).refreshBody();
  barreira.create(620,480, 'barreira3').setScale(0.30).refreshBody();
  barreira.create(600,480, 'barreira3').setScale(0.30).refreshBody();
  barreira.create(33,500, 'barreira3').setScale(1).refreshBody();
  barreira.create(45,55, 'barreira2').setScale(0.075).refreshBody();
  barreira.create(1120,360, 'barreira2').setScale(0.075).refreshBody();
  barreira.create(940,130, 'barreira2').setScale(0.05).refreshBody();
  barreira.create(940,80, 'barreira2').setScale(0.05).refreshBody();
  barreira.create(520,80, 'barreira2').setScale(0.05).refreshBody();
  barreira.create(600,80, 'barreira2').setScale(0.05).refreshBody();
  barreira.create(650,80, 'barreira2').setScale(0.05).refreshBody();
  barreira.create(985,630, 'barreira2').setScale(0.05).refreshBody();
  barreira.create(985,580, 'barreira2').setScale(0.05).refreshBody();
  barreira.create(205,460, 'barreira2').setScale(0.05).refreshBody();
  barreira.create(325,325, 'barreira2').setScale(0.05).refreshBody();
  barreira.create(this.sys.game.config.width - 45,55, 'barreira2').setScale(0.075).refreshBody();
  barreira.create(this.sys.game.config.width - 45,this.sys.game.config.height - 55, 'barreira2').setScale(0.075).refreshBody();
  barreira.create(45,this.sys.game.config.height - 55, 'barreira2').setScale(0.075).refreshBody();
  barreira.create(500,50, 'barreira').setScale(1).refreshBody();
  barreira.create(895,300, 'barreira').setScale(0.35).refreshBody();
  barreira.create(895,420, 'barreira').setScale(0.35).refreshBody();
  barreira.create(500,50, 'barreira').setScale(1).refreshBody();
  barreira.create(430,240, 'barreira').setScale(0.33).refreshBody();
  barreira.create(430,290, 'barreira').setScale(0.33).refreshBody();
  barreira.create(430,270, 'barreira').setScale(0.33).refreshBody();
  barreira.create(175,490, 'barreira').setScale(0.33).refreshBody();
  barreira.create(175,530, 'barreira').setScale(0.33).refreshBody();
  barreira.create(175,510, 'barreira').setScale(0.33).refreshBody();





  this.physics.add.collider(player, barreira);

/*

  if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())){
    this.gameOver();

    gameScene.gameOver() = function (){
      this.scene.restart();
    }
  }

*/
};




gameScene.update = function (){

cursors = this.input.keyboard.createCursorKeys();

var inMov = false;

  if (cursors.right.isDown) {
    player.setVelocityX(+160);
    inMov = true;
  }
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    inMov = true;
  }
  if (cursors.down.isDown) {
    player.setVelocityY(+160);
    inMov = true;
  }
  if (cursors.up.isDown) {
    player.setVelocityY(-160);
    inMov = true;

  }

  if(!inMov) player.setVelocity(0);
}




gameScene.init = function () {

  this.playerSpeed = 1.5;

  this.enemyMaxY = 280;
  this.enemyMinY = 80;
}



// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: gameScene,
  physics: {
    default: 'arcade',
    arcade: {

      debug: true
    }
  }
};



// create the game, and pass it the configuration
let game = new Phaser.Game(config);
