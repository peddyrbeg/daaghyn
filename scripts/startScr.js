class startPic {

	constructor () {
		this.c = Math.floor(random(0,7));
		this.daah = daah[this.c];
		this.x = Math.floor(random(0, 220));
		this.y = Math.floor(random(0, height));
		this.r = random(0, 0.5);
		this.s = random(50, 150);
		this.speed = random(1, 2);
	}

	display () {
		push();
		if (this.x > cnv.width + 150) {
			this.c = Math.floor(random(0,7));
			this.x = -150;
			this.y = Math.floor(random(0, height));
		}
		translate(this.x += this.speed, this.y--);
		rotate(this.r);
		image(this.daah, 0, 0, this.s, this.s);
		pop();
	}

}
