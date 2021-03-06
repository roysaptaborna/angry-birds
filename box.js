class Box {
	constructor(x, y, w, h) {
		this.body = Bodies.rectangle(x, y, w, h);
		this.body.friction = 0.5;
		this.body.density = 0.8;
		World.add(engine.world, this.body);
		this.width = w;
		this.height = h;
		this.image = loadImage("assets/woodbox.png");
	}
	display() {
		push();
		translate(this.body.position.x, this.body.position.y);
		rotate(this.body.angle*180/PI);
		imageMode(CENTER);
		image(this.image,0,0, this.width, this.height);
		pop();
	}
}
