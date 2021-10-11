var gamestate = "play";
var road, roadImg, invisibleGround;
var background4Img;
var player,playerImg;
var fire, fire_Img ,fireGroup;
var bomb, bombImg, bombGroup;
var ghost, ghost_Img;
var coin, coin_img,coinGroup,cash,cashImg,cashGroup,diamonds,diamondsImg,diamondsGroup;
var gameover ,gameoverImg;
var music
var treasure=0;






function preload(){
roadImg = loadImage("road.png");
playerImg = loadAnimation("mainPlayer1.png","mainPlayer2.png");
bombImg =loadImage("bomb.png");
fire_Img =loadImage("fire2.png");
coin_img =loadImage("coin.png");
cashImg =loadImage("cash.png");
diamondsImg =loadImage("diamonds.png");
ghost_img =loadImage("ghost.png");
gameoverImg =loadImage("images.png");


background4Img =loadImage("background4.jpg")
music = loadSound("music.mp3");





}

function setup() {
    createCanvas(windowWidth,windowHeight);
    music.loop();
    road = createSprite(width/2-300,500,500,500);
    road.addImage(background4Img);
    road.velocityX =-10
   

    player = createSprite(200,995);
    player.addAnimation("player",playerImg);
    player.scale =0.15

    ghost = createSprite(50,870);
    ghost.addImage(ghost_img);
    ghost.scale =0.2

    invisibleGround = createSprite(200,1050);
    invisibleGround.visible=false;

    gameover = createSprite(300,300);
    gameover.addImage(gameoverImg);
    
    player.setCollider("rectangle",0,0,player.width-350,player.height-300);


    fireGroup =new Group();
    coinGroup =new Group();
    bombGroup =new Group();
    cashGroup =new Group();
    diamondsGroup =new Group();
 

    

 
}

function draw() {
   background("white");
   
   

    if (gamestate == "play"){
   gameover.visible =false
   
   if (road.x <0){
         road.x =road.width/2
       }

      if (keyDown("space")&& player.y>=600){
          player.velocityY = -20;
      }
    
          player.velocityY = player.velocityY+0.8

       if (coinGroup.isTouching(player)){
           coinGroup.destroyEach();
           treasure=treasure+100
       }

       if (cashGroup.isTouching(player)){
           cashGroup.destroyEach();
           treasure=treasure+50
       }
       
       if (diamondsGroup.isTouching(player)){
           diamondsGroup.destroyEach();
           treasure=treasure+500

       }
       

            player.collide(invisibleGround);
            
    spawnObstacleFire();
    spawnRewards();
    spawnObstacleBomb();

    
    
        
    
    
    drawSprites();      


    

    if (fireGroup.isTouching(player)||bombGroup.isTouching(player)){
        gamestate = "end"
        player.destroy();
        
        }
      
     }  
    else if (gamestate== "end"){
        gameover.visible = true
        background("black")
        textSize(200)
        fill("red")
        stroke("gold");
        strokeWeight(10);
        text("GAME OVER",600,height/2)
    }
    

 
 textSize(40);
fill("black");
text("Treasure: "+ treasure ,700,150);
}

function spawnObstacleFire() {
   if(frameCount%500 ===0){
    fire = createSprite(Math.round(random(600,1000)),950);
   fire.velocityX =-10
   fire.addImage(fire_Img);
   fire.scale =0.2
   fire.lifetime = 600

   fire.depth=ghost.depth
   ghost.depth=ghost.depth+1
   fireGroup.add(fire)
   }
   
}

function spawnObstacleBomb(){

   if (frameCount%300===0){
    
   bomb = createSprite(Math.round(random(600,1000)),950);
   bomb.velocityX =-10
   bomb.addImage(bombImg);
   bomb.scale =0.15
   bomb.lifetime = 600
   bomb.depth=ghost.depth
   ghost.depth=ghost.depth+1
   
   bombGroup.add(bomb);
   } 
}

function spawnRewards(){
  if (frameCount%100 ===0){
    coin = createSprite(800,Math.round(random(600,1000)));
    coin.velocityX =-5
    coin.addImage(coin_img);
    coin.scale =0.7
    coin.lifetime = 600
    coinGroup.add(coin);
  }
  if (frameCount%50===0){
     cash = createSprite(800,Math.round(random(600,1000)));
     cash.velocityX =-5
     cash.addImage(cashImg);
     cash.scale =0.2
     cash.lifetime = 600
     cashGroup.add(cash); 
    }

    if (frameCount%80===0){
      diamonds = createSprite(800,Math.round(random(600,1000)));
      diamonds.velocityX =-5
      diamonds.addImage(diamondsImg);
      diamonds.scale =0.05
      diamonds.lifetime = 600
      diamondsGroup.add(diamonds);

    }
}