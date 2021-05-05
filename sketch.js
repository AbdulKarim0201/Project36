var dog,sadDog,happyDog;
var foodS,foodStock;
var addFood;
var foodObj;
var database;
var feed,lastFed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {

  
  database = firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feeddog=createButton("Feed The Dog");
  feeddog.position(690,95);
  feeddog.mousePressed(feedDog);


}

function draw() {
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function (data){
    lastFed = data.val();
  })  



  stroke(10);
  fill("black");
  textSize(15);
  if (lastFed>+12){
    text("Last feed:"+lastFed%12 +"PM",330,30);
  }
  
  else if(lastFed == 0){ 
    text("Last Feed : 12AM",330,30);
  }
  
  else{
    text("Last Feed: " + lastFed + "AM",330,30);
  }



 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:  foodObj.getFoodStock(),
    FeedTime : hour()
  })
 

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
