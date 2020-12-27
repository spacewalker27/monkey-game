
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,bananaGroup
var FoodGroup, obstacleGroup
var score;
var ground;
score=0;
var gameState="PLAY";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 obstacleGroup=createGroup();
  bananaGroup=createGroup();
}



function setup() {
  createCanvas(600,600)
  monkey=createSprite(30,250,30,30);
  monkey.addAnimation("an1",monkey_running);
  monkey.scale=0.12;

  ground=createSprite(300,300,600,5);
  ground.velocityX=-6;
  
  
}


function draw() {
  
  background("white")
  if(ground.x>0) {
    ground.x=ground.width /2;
  }
  console.log(monkey.y)
  if(gameState==="PLAY") {
    rocks();
  spawnBananas();
    
     if(keyDown("space") ) {
    monkey.velocityY =-12; 
     }
   monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  
  if(bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    
  }
  if(frameCount%30===0) {
    score=score+1;
  }
  text("survival time="+score,300,10);
    if(obstacleGroup.isTouching(monkey)) {
      gameState="END";
    }
  
  }
  if(gameState==="END") {
    text.size=40;
    text("game over,score="+score,300,300);
    monkey.destroy();
    ground.destroy();
  }
  
 
  
  
 
  
  
drawSprites();
  
}

function rocks() {
  if(frameCount%60===0) {
    obstacle=createSprite(300,284,30,30)
    obstacle.addImage("img",obstacleImage)
    obstacle.scale=0.1;
    obstacle.velocityX=ground.velocityX;
    
    obstacle.depth=monkey.depth;
    monkey.depth=obstacle.depth+1;
    obstacle.lifetime=300;
    obstacleGroup.add(obstacle);
    
    
  }
  
}

function spawnBananas() {
  if(frameCount%110===0) {
    banana=createSprite(300,random(150,10),20,20);
    banana.addImage("img2",bananaImage)
    banana.scale=0.1;
    bananaGroup.add(banana)
    banana.lifetime=300;
    banana.velocityX=ground.velocityX;
  }
  
}






