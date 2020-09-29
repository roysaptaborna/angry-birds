class Pig extends Box {
	constructor(x, y) {
		super(x, y, 75, 75);
		this.image = loadImage("assets/pig.png");
		this.visibility = 255;
	}
	display() {
		if (this.body.speed < 2) {
			super.display();
		} else {
			World.remove(engine.world, this.body);
			push();
			tint(255, this.visibility);
			image(this.image, this.body.position.x, this.body.position.y, 75, 75);
			pop();
			this.visibility = this.visibility - 5;
		}
	}
	score() {
		if (this.visibility < 0 && this.visibility > -1255) {
			score = score + 1;
		}
	}
}
