var balloon;
var backgroundImg;
var balloonImg1,balloonImg2,balloonImg3;
var database , position;

function preload(){
  backgroundImg = loadImage("Hot Air Ballon-01.png");
  balloonImg1 = loadAnimation("Hot Air Ballon-02.png");
  balloonImg2 = loadAnimation("Hot Air Ballon-03.png");
  balloonImg3 = loadAnimation("Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(500,500);
  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("Hot Air Balloon" , balloonImg1);
  balloon.scale = 0.4;
  database = firebase.database();
  var balloonPosition = database.ref("balloon/position");
  balloonPosition.on("value",readPosition,showError);
}

function draw() {
  background(backgroundImg);
  fill("black")
  stroke("yellow")
  textSize(18)
  text("Use Arrow Keys 👈 👉 👆 👇 to move Hot Air Balloon",10 , 30)  

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("Hot Air Balloon",balloonImg1);
 }
else if(keyDown(RIGHT_ARROW)){
   updateHeight(10,0);
   balloon.addAnimation("Hot Air Balloon",balloonImg2);
}
else if(keyDown(UP_ARROW)){
  updateHeight(0,-10);
  balloon.addAnimation("Hot Air Balloon",balloonImg3);
  balloon.scale = balloon.scale+0.01;
}
else if(keyDown(DOWN_ARROW)){
  updateHeight(0,10);
  balloon.addAnimation("Hot Air Balloon",balloonImg1);
  balloon.scale = balloon.scale-0.01;
}
  drawSprites();
}

function updateHeight(x,y){
  database.ref("balloon/position").set({
      x:balloon.x+x,
      y:balloon.y+y
  })
}
function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}
function showError(){
  console.log("Error");
}