var PLAY = 1;
var END = 0;
var gameState = PLAY;

var blockimage;

var blockgroup;

var bananasimage

var bananagroup;

var bananas;
var banana ;

var gameOver, restart;
var blocks;
var block ;

function preload(){
backgroundimage = loadImage("background.gif")
bananasimage = loadImage("banana.png")
  blockimage = loadImage("block.gif")
  coinimage = loadImage("coin.gif")
  monkeyimage = loadImage("monkey.gif")
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 500);
  
    

  monkey = createSprite(300,300,5,5)
  monkey.addImage(monkeyimage)
monkey.scale  = 0.1

  block = createSprite(300,500,100,20)

blockgroup = createGroup()

bananagroup = createGroup()

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(backgroundimage);
  text("Score: "+ score, 500,50);
  
  if(keyDown("UP_ARROW") && monkey.y >= 159) {
    monkey.velocityY = -12;
  }

  if(keyDown("LEFT_ARROW")) {
    monkey.x = monkey.x-5;
  }
  if(keyDown("RIGHT_ARROW")  ) {
    monkey.x = monkey.x+5;
  }

  if(monkey.isTouching (bananagroup)){
    score=score+1;
  }

  monkey.velocityY = monkey.velocityY + 0.8
  
  
  monkey.collide(block)

  spawnblocks();
  spawnbananas();
  
  if(monkey.isTouching(blockgroup)){
    
    monkey.velocityY = 0;
  }


  drawSprites();
}

function spawnblocks(){
  if (frameCount % 250 === 0){
  blocks = createSprite(random(50,550),random(50,450),20,20)
  blocks.addImage(blockimage) 
  blocks.scale = 0.2

  blocks.velocityX = random(1.2)

   blockgroup.add(blocks)
  
  }
}


function spawnbananas(){
  if (frameCount % 250 === 0){
  bananas = createSprite(blocks.x,blocks.y-20,20,20)
  bananas.addImage(bananasimage) 
  bananas.scale = 0.02;

  bananas.velocityX = blocks.velocityX
  

   bananagroup.add(bananas)
  
  }
}



function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
 
  
  score = 0;
  
}