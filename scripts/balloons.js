class Balloon {
	
	constructor () {
		this.r = Math.floor(random(0,4));
		this.daah = daah[this.r];
		this.x = random(50, 250);
		this.y = height;
		this.release = random(0, 300);
		this.popped = false;
		this.a = 255;
		this.finished = false;
		this.speed = random(1, 2);
	}

	display () {
		imageMode(CENTER);
		tint(255, this.a);
		if (frameCount > this.release && this.popped == false) {
			this.y = this.y - this.speed*level;
			image(this.daah, this.x, this.y);
		}
		else if (this.popped == true) {
			this.a--;
			image(popped[this.r], this.x, this.y);
		}
		if (this.y < 0) this.finished = true;
	}

	balloonPop () {
		if (mouseX > this.x -50 && mouseX < this.x +50 && mouseY < this.y +50 && mouseY > this.y -50 && ranCol == this.r) {
			if (this.popped == false) {
				popSound.play();
				score++;
			}
			this.finished = true;
			this.popped = true;
		}
	}

}
