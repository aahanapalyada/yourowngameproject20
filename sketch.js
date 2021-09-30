var roo, roorunning;
var rooandkanga, rooandkangaImg;
var score ;
var background, backgroundImg;
var invisibleGround;
var obstacle, obstacleImg, obstaclesGroup;
var gameState = "play"


function preload(){
 roorunning = loadAnimation("roo1.png","roo2.png");
 rooandkangaImg = loadImage("rooandkanga(1).png");
 backgroundImg = loadImage("background.png");
 obstacleImg = loadImage("obstacle.png");
 //roostandingImg = loadImage("roostanding.png");
}

function setup() {
 createCanvas(490,300);
 score = 0;
 background = createSprite(200,150,250,100);
 background.addImage("grass",backgroundImg);
 background.velocityX = -1;
 background.scale = 1; 
 //background.visible = false; 
 roo = createSprite(100,200,50,70);
 roo.addAnimation("running",roorunning);
 roo.scale = 0.07;  
 roo.setCollider("circle",100,100,400);
 //roo.debug = true;    
 invisibleGround = createSprite (250,230,500,20); 
 invisibleGround.visible = false;
 obstaclesGroup = new Group();
 rooandkanga = createSprite(200,140,50,50);
 rooandkanga.addImage(rooandkangaImg);
 rooandkanga.scale = 0.4;
} 
 
function draw() {
  
  if (gameState === "play" )   {
   if (keyDown("space") && roo.y>130) {
       roo.velocityY = -15; 
   }
   
   roo.velocityY = roo.velocityY + 0.7;
   if (background.x<175) {
       background.x = 300;
   }  
   roo.collide (invisibleGround);
   spawnFlowers();
   score = score + Math.round(getFrameRate()/60);
   score.depth = background.depth;
   score.depth = score.depth +1;
   if (roo.isTouching(obstaclesGroup)) {
       gameState = "end";
   }
   rooandkanga.visible = false;
  }

 drawSprites();

  fill("black"); 
  text("Score: "+score,430,20);
  if (gameState === "end") {
    roo.destroy();
    obstacle.destroy();
    background.velocityX = 0;
    textSize(20);
    fill("black");
    text("Playtime Over!",185,30);
    rooandkanga.visible = true;
}
}

function spawnFlowers() {
    if (frameCount % 80 === 0) {
        obstacle = createSprite (20,195);
        obstacle.addImage(obstacleImg);
        obstacle.scale = 0.04;
        obstacle.velocityX = -5;
        obstacle.x = Math.round(random(250,350));
        roo.depth = obstacle.depth;
        roo.depth = roo.depth+1;
        obstacle.lifetime = 300;
        obstaclesGroup.add(obstacle);
    }
}