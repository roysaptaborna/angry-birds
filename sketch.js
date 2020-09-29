const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const World = Matter.World;

var engine;
var ground;
var bg;
var soil;
var platform;
var constraint;
var score;
var gs;

/*async function getBackgroundClass() {
	var response = await fetch(
		"http://worldtimeapi.org/api/timezone/Asia/Kolkata"
	);
	var rjson = await response.json();
	var hour = rjson.datetime.slice(11, 13);
	if (hour >= 6 && hour >= 19) {
		bg = loadImage("assets/background.png");
	} else {
		bg = loadImage("assets/base.png");
	}
}*/

function preload() {
	bg = loadImage("assets/background.png");
	//getBackgroundClass();
	soil = loadImage("assets/base.png");
	sling1 = loadImage("assets/sling1.png");
	sling2 = loadImage("assets/sling2.png");
}

function setup() {
	createCanvas(1200, 600);
	engine = Matter.Engine.create();
	ground = Matter.Bodies.rectangle(600, 590, 1200, 25);
	ground.isStatic = true;
	World.add(engine.world, ground);

	score = 0;
	gs = 1;

	box1 = new Box(800, 550, 75, 75);
	box2 = new Box(1000, 550, 75, 75);
	log1 = new Log(900, 515, 275, 20);
	box3 = new Box(800, 480, 75, 75);
	box4 = new Box(1000, 480, 75, 75);
	log2 = new Log(900, 445, 275, 20);
	box5 = new Box(900, 410, 75, 75);
	log3 = new Log(810, 360, 20, 150);
	Matter.Body.setAngle(log3.body, PI / 9);
	log4 = new Log(1000, 360, 20, 150);
	Matter.Body.setAngle(log4.body, -PI / 9);
	pig1 = new Pig(900, 485);
	pig2 = new Pig(900, 555);

	bird = new Bird(205, 160);

	platform = Matter.Bodies.rectangle(100, 430, 300, 300);
	platform.isStatic = true;
	World.add(engine.world, platform);

	constraint = Matter.Constraint.create({
		bodyA: bird.body,
		pointB: { x: 205, y: 160 },
		length: 10,
		stiffness: 0.04,
	});
	World.add(engine.world, constraint);
}

function draw() {
	if (bg) {
		background(bg);
	}
	Matter.Engine.update(engine);
	console.log(pig1.body.speed);
	ground.isStatic = true;
	rectMode(CENTER);
	fill(50, 21, 8);
	rect(ground.position.x, ground.position.y, 1200, 25);
	box1.display();
	box2.display();
	log1.display();
	box3.display();
	box4.display();
	log2.display();
	box5.display();
	log3.display();
	log4.display();
	pig1.display();
	pig2.display();

	pig1.score();
	pig2.score();

	textSize(25);
	stroke("black");
	text("SCORE = " + score, 1000, 50);

	bird.display();
	rectMode(CENTER);
	fill(50, 21, 8);
	rect(platform.position.x, platform.position.y, 300, 300);
	if (constraint.bodyA) {
		if (constraint.bodyA.position.x < 225) {
			strokeWeight(8);
			stroke(48, 22, 5);
			line(
				constraint.bodyA.position.x - 20,
				constraint.bodyA.position.y,
				constraint.pointB.x - 10,
				constraint.pointB.y + 8
			);
			line(
				constraint.bodyA.position.x - 20,
				constraint.bodyA.position.y,
				constraint.pointB.x + 30,
				constraint.pointB.y
			);
		} else {
			strokeWeight(5);
			stroke(48, 22, 5);
			line(
				constraint.bodyA.position.x + 25,
				constraint.bodyA.position.y,
				constraint.pointB.x - 10,
				constraint.pointB.y + 8
			);
			line(
				constraint.bodyA.position.x + 25,
				constraint.bodyA.position.y,
				constraint.pointB.x + 30,
				constraint.pointB.y
			);
		}
	}
	stroke(0);
	strokeWeight(1);
	//text("x:" + mouseX + "y:" + mouseY, mouseX, mouseY);

	image(sling1, 225, 215, 35, 150);
	image(sling2, 200, 190, 35, 80);
}

function mouseDragged() {
	if (gs !== 2) {
		Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY });
	}
}

function mouseReleased() {
	constraint.bodyA = null;
	gs = 2;
}

function keyPressed() {
	if (keyCode == 32) {
		constraint.bodyA = bird.body;
		Matter.Body.setPosition(bird.body, { x: 205, y: 160 });
		bird.trajectory = [];
		gs = 1;
	}
}
