class Slingshot {
	constructor(bodyA, pointB) {
		var options = { bodyA: bodyA, pointB: pointB, stiffness: 0.04, length: 20 };
		this.image1 = loadImage("assets/sling1.png");
		this.image2 = loadImage("assets/sling2.png");
		this.image3 = loadImage("assets/sling3.png");
		this.sling = Constraint.create(options);
		this.pointB = pointB;
		World.add(world, this.sling);
	}
	fly() {
		this.sling.bodyA = null;
	}
	attach(body) {
		this.sling.bodyA = body;
	}
	display() {
		if (this.sling.bodyA) {
			var pointA = this.sling.bodyA.position;
			var pointB = this.pointB;
			push();

			stroke(48, 22, 8);
			if (pointA.x < 220) {
				strokeWeight(7);
				line(pointA.x - 18, pointA.y, pointB.x - 10, pointB.y);
				line(pointA.x - 18, pointA.y, pointB.x + 30, pointB.y - 3);
				image(this.image3, pointA.x - 30, pointA.y - 10, 15, 30);
			} else {
				strokeWeight(3);
				line(pointA.x + 25, pointA.y, pointB.x - 10, pointB.y);
				line(pointA.x + 25, pointA.y, pointB.x + 30, pointB.y - 3);
				image(this.image3, pointA.x + 25, pointA.y - 10, 15, 30);
			}
			pop();
		}
		image(this.image1, 200, 90);
		image(this.image2, 170, 90);
	}
}
