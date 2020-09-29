class Bird extends Box {
	constructor(x, y) {
		super(x, y, 50, 50);
		this.image = loadImage("assets/bird.png");
		this.image2 = loadImage("assets/smoke.png");
		this.trajectory = [];
	}
	display() {
		super.display();
		if (this.body.velocity.x > 10 && this.body.position.x > 225) {
			var position = [this.body.position.x, this.body.position.y];
			this.trajectory.push(position);
		}
		for (var i = 0; i < this.trajectory.length; i = i + 1) {
			imageMode(CENTER);
			image(this.image2, this.trajectory[i][0], this.trajectory[i][1]);
		}
	}
}
